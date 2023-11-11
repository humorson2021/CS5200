let express = require("express");
let router = express.Router();

const {
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
  createPlayer,
  getTeams,
  getTeam,
  updateTeam
} = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
router.get("/", async function (req, res) {
  res.render("index", {});
});

// Render players
router.get("/players", async function (req, res) {
  try {
    const players = await getPlayers();
    console.log("route / called  -  players.length", players.length);
    res.render("players_list", { players, err: null, type: "success" });
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("players_list", {
      players: [],
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Render the edit interface of player
router.get("/players/:player_id/edit", async function (req, res) {
  console.log("Edit route", req.params.player_id);

  try {
    const sqlRes = await getPlayer(req.params.player_id);
    console.log("players edit found player", sqlRes);

    if (sqlRes.length === 1) {
      res.render("players_edit", { player: sqlRes[0], err: null, type: "success" });
    } else if (sqlRes.length > 1) {
      res.render("players_edit", {
        player: sqlRes[0],
        err: "There is more than one player with that id =" + req.params.player_id,
        type: "danger",
      });
    } else {
      res.render("players_edit", {
        player: null,
        err: "Error finding the ride = " + req.params.player_id,
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("players_edit", {
      player: null,
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Actually update the player
router.post("/players/:player_id/edit", async function (req, res) {
  console.log("Edit route", req.params.player_id, req.body);

  const player_id = req.params.player_id;
  const newPlayer = req.body;

  try {
    const sqlResUpdate = await updatePlayer(player_id, newPlayer);
    console.log("Updating player", sqlResUpdate);

    if (sqlResUpdate.changes === 1) {
      const sqlResFind = await getPlayer(req.params.player_id);
      res.render("players_edit", {
        player: sqlResFind[0],
        err: "Player modified",
        type: "success",
      });
    } else {
      res.render("players_edit", {
        player: null,
        err: "Error updating the player = " + player_id,
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("players_edit", {
      player: null,
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Render the details interface
router.get("/players/:player_id", async function (req, res) {
  console.log("Players detail route", req.params.player_id);

  // Do we have any message to show?
  const msg = req.query.msg || null;

  try {
    const sqlRes = await getPlayer(req.params.player_id);
    console.log(
      "players edit found player",
      sqlRes,
    );

    if (sqlRes.length === 1) {
      const team = await getTeam(sqlRes[0].team_id);
      res.render("players_details", {
        player: sqlRes[0],
        team: team,
        err: msg,
        type: "success",
      });
    } else {
      res.render("players_details", {
        player: null,
        team: null,
        err: "Error finding the team_id = " + req.params.team_id,
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("players_details", {
      player: null,
      team: null,
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Render the edit interface
router.get("/players/:player_id/delete", async function (req, res) {
  console.log("Delete route", req.params.player_id);

  try {
    const sqlResDelete = await deletePlayer(req.params.player_id);
    console.log("Delete player res=", sqlResDelete);
    const players = await getPlayers();
    if (sqlResDelete.changes === 1) {
      res.render("players_list", { players, err: "Player deleted", type: "success" });
    } else {
      res.render("players_list", {
        players,
        err: "Error deleting the player",
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    const players = await getPlayers();
    res.render("players_list", {
      players,
      err: "Error executing the SQL",
      type: "danger",
    });
  }
});

// Render the create interface of player
router.get("/players/create", async function (req, res) {
  console.log("Create route", req.params.player_id);

  res.render("players_create", { err: null, type: "success" });
});

// Actually create the player
router.post("/players/create", async function (req, res) {
  console.log("Create route", req.body);

  const newPlayer = req.body;

  try {
    const sqlResCreate = await createPlayer(newPlayer);
    console.log("Updating player", sqlResCreate);
    const players = await getPlayers();

    if (sqlResCreate.changes === 1) {
      res.render("players_list", {
        players,
        err: "Player created " + sqlResCreate.lastID,
        type: "success",
      });
    } else {
      res.render("players_list", {
        err: "Error inserting the player ",
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("players_create", {
      err: "Error inserting the player " + exception,
      type: "danger",
    });
  }
});

// Render teams
router.get("/teams", async function (req, res) {
  try {
    const teams = await getTeams();
    console.log("route / called  -  teams.length", teams.length);
    res.render("teams_list", { teams, err: null, type: "success" });
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("teams_list", {
      teams: [],
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Render the edit interface of team
router.get("/teams/:team_id/edit", async function (req, res) {
  console.log("Edit team", req.params.team_id);

  try {
    const sqlRes = await getTeam(req.params.team_id);
    console.log("teams edit found team", sqlRes);

    if (sqlRes.length === 1) {
      res.render("teams_edit", { team: sqlRes[0], err: null, type: "success" });
    } else if (sqlRes.length > 1) {
      res.render("teams_edit", {
        player: sqlRes[0],
        err: "There is more than one team with that id =" + req.params.team_id,
        type: "danger",
      });
    } else {
      res.render("teams_edit", {
        player: null,
        err: "Error finding the team = " + req.params.team_id,
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("teams_edit", {
      player: null,
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// Actually update the team
router.post("/teams/:team_id/edit", async function (req, res) {
  console.log("Edit team", req.params.team_id, req.body);

  const team_id = req.params.team_id;
  const newTeam = req.body;

  try {
    const sqlResUpdate = await updateTeam(team_id, newTeam);
    console.log("Updating team", sqlResUpdate);

    if (sqlResUpdate.changes === 1) {
      const sqlResFind = await getTeam(req.params.team_id);
      res.render("teams_edit", {
        team: sqlResFind[0],
        err: "Team modified",
        type: "success",
      });
    } else {
      res.render("teams_edit", {
        team: null,
        err: "Error updating the team = " + team_id,
        type: "danger",
      });
    }
  } catch (exception) {
    console.log("Error exceuting sql", exception);
    res.render("teams_edit", {
      team: null,
      err: `Error executing SQL ${exception}`,
      type: "danger",
    });
  }
});

// // ********  Comments routes ********

// // Update the comment from the trips_details view, returns to trips_details
// router.post("/comments/:comment_id/edit", async function (req, res) {
//   console.log("Edit comment route", req.params.comment_id, req.body);

//   const comment_id = req.params.comment_id;
//   const newComment = req.body;

//   try {
//     const sqlResUpdate = await updateComment(comment_id, newComment);
//     console.log("Updating comment", sqlResUpdate);

//     const editedComment = (await getComment(comment_id))[0];

//     console.log("Edited Comment", editedComment);

//     if (sqlResUpdate.changes === 1) {
//       res.redirect(`/trips/${editedComment.ride_id}/?msg=Comment modified`);
//     } else {
//       // More than one comment found
//       res.redirect(`/trips/${editedComment.ride_id}/?msg=Error editing comment`);
//     }
//   } catch (exception) {
//     console.log("Error exceuting sql", exception);
//     res.render("trips_details", {
//       trip: null,
//       comments: [],
//       err: "Error editing the comment " + exception,
//       type: "danger",
//     });
//   }
// });

// // Update the comment from the trips_details view, returns to trips_details
// router.get("/comments/:comment_id/delete", async function (req, res) {
//   console.log("Delete comment route", req.params.comment_id);

//   const comment_id = req.params.comment_id;

//   try {
//     // Get the comment before we delete it to get the ride_id
//     const sqlResFindComment = await getComment(req.params.comment_id);
//     const oldComment = sqlResFindComment[0];

//     const sqlResUpdate = await deleteComment(comment_id);
//     console.log("Deleting comment", sqlResUpdate);

//     if (sqlResUpdate.changes === 1) {
//       res.redirect(`/trips/${oldComment.ride_id}/?msg=Comment deleted`);
//     } else {
//       res.redirect(`/trips/${oldComment.ride_id}/?msg=Error deleting comment`);
//     }
//   } catch (exception) {
//     console.log("Error exceuting sql", exception);
//     res.render("trips_details", {
//       trip: null,
//       comments: [],
//       err: "Error deleting the comment " + exception,
//       type: "danger",
//     });
//   }
// });

// // Create a comment from the trips_detail view. Content comes in the body, including the ride_id
// router.post("/comments/create", async function (req, res) {
//   console.log("Create comments route", req.body);

//   const newComment = req.body;

//   try {
//     const sqlResCreate = await createComment(newComment);
//     console.log("creating comment result", sqlResCreate);

//     res.redirect(`/trips/${newComment.ride_id}/?msg=Comment inserted`);
//   } catch (exception) {
//     console.log("Error exceuting sql", exception);
//     res.render("trips_create", {
//       err: "Error inserting the ride " + exception,
//       type: "danger",
//     });
//   }
// });

module.exports = router;
