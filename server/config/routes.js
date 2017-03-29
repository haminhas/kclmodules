import passport from 'passport';
import path from 'path';
import { decideSwap } from './moduleAuthoriser';
import {
  getStudentModules,
  getProgrammeModules,
  getModuleTimetable,
  removeOldModules,
  insertStudentTimetable,
  getSpecialisation,
  getSpecialisationModules,
  getAllAdmins,
  getAllProgrammes,
  insertAmmendment,
} from './db';


export default (app) => {
  async function amend(req) {
    try {
      const newTimetable = req.body.timetable;
      const oldIsRemoved = await removeOldModules(req.user.alias);
      if (oldIsRemoved > 0) {
        for (const obj of newTimetable) {
          const response = await insertStudentTimetable(req.user.alias, obj.id, obj.groupnumber);
          if (response <= 0) throw new Error('Failed inserting new Module');
        }
      } else {
        throw new Error('Failed deleting old modules');
      }
      for (let i = 0; i < req.body.newMod.length; i++) {
        const response = await insertAmmendment(req.body.newMod[i].code, req.body.oldMod[i].code);
        if (response <= 0) throw new Error('Failed inserting ammendments analytics');
      }
      return true;
    } catch (err) {
      return err;
    }
  }

  const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next(); }
    return res.redirect('/');
  };

  app.post('/programmes', ensureAuthenticated, async (req, res) => {
    const programmes = await getAllProgrammes();
    return res.json(programmes);
  });

  app.post('/specialisation', ensureAuthenticated, async (req, res) => {
    const response1 = await getSpecialisation(req.user.alias);
    const response2 = await getSpecialisationModules(req.user.alias);
    return res.json([response1, response2]);
  });

  app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  app.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/checkClash', ensureAuthenticated, async (req, res) => {
    const response = await decideSwap(
      req.user.alias,
      req.body.oldModules,
      req.body.newModules
    );
    res.send(response);
  });

  app.post('/amend', ensureAuthenticated, async (req, res) => {
    const response = await amend(req);
    if (response) {
      const response1 = await getStudentModules(req.user.alias);
      const response2 = await getProgrammeModules(req.user.alias);
      return res.json([response1, response2]);
    }
    return res.json(response);
  });


  app.get('/user', ensureAuthenticated, async (req, res) => {
    // const admins = await getAllAdmins();
    const admins = [];

    for (const obj of admins) {
      if (obj.email === req.user.emails[0].value) {
        return res.json({ userID: req.user.alias, name: req.user.displayName, isAdmin: true});
      }
    }
    return res.json({ userID: req.user.alias, name: req.user.displayName, isAdmin: false});
  });

  app.post('/moduleTimetables', ensureAuthenticated, async (req, res) => {
    try {
      const modules = req.body.moduleCodes;
      for (let i = 0; i < modules[0].length; i++) {
        modules[1] = modules[1].filter((x) =>
        x.code !== modules[0][i].code
      );
      }
      const timetable = [];
      for (let i = 0; i < modules.length; i++) {
        for (let j = 0; j < modules[i].length; j++) {
          const response = await getModuleTimetable(modules[i][j].code);
          timetable.push(response);
        }
      }
      return res.json(timetable);
    } catch (err) {
      console.log(err);
      return err;
    }
  });

  app.post('/modules', ensureAuthenticated, async (req, res) => {
    const response1 = await getStudentModules(req.body.userID);
    const response2 = await getProgrammeModules(req.body.userID);
    return res.json([response1, response2]);
  });

  app.get('/auth/callback',
    passport.authenticate('windowslive', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/dashboard');
    });

  app.get('/auth',
    passport.authenticate('windowslive', { scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]}),
    (req, res) => {
    }
  );

  // send all requests to index.html so browserHistory works
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
};
