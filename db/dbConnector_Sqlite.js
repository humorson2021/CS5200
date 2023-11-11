const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function connect() {
  return open({
    // filename: "./db/bikeShare.sqlite3",
    // driver: sqlite3.Database,
    filename: "./db/bridge.db",
    driver: sqlite3.Database,
  });
}

async function getPlayers() {
  const db = await connect();
  try {
    const players = await db.all(`SELECT player_id, 
      team_id, 
      name, 
      sex, 
      contact
    FROM  Players
    ORDER BY player_id DESC
    LIMIT 20;
    `);

    console.log("dbConnector got data", players.length);

    return players;
  } finally {
    await db.close();
  }
}

async function getPlayer(player_id) {
  console.log("Get player player_id", player_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`SELECT
    player_id,
    team_id, 
    name, 
    sex, 
    contact
  FROM  Players
  WHERE 
    player_id = :player_id    
  `);

    stmt.bind({ ":player_id": player_id });

    const player = await stmt.all();

    await stmt.finalize();

    return player;
  } finally {
    await db.close();
  }
}

async function updatePlayer(player_id, newPlayer) {
  console.log("update player player_id", player_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`UPDATE players  
    SET
      team_id = :team_id, 
      name = :name, 
      sex = :sex, 
      contact = :contact
  WHERE 
    player_id = :player_id    
  `);

    stmt.bind({
      ":player_id": player_id,
      ":team_id": newPlayer.team_id,
      ":name": newPlayer.name,
      ":sex": newPlayer.sex,
      ":contact": newPlayer.contact,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

async function deletePlayer(player_id) {
  console.log("update player player_id", player_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`DELETE FROM players      
  WHERE 
    player_id = :player_id    
  `);

    stmt.bind({
      ":player_id": player_id,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

async function createPlayer( newPlayer) {
  console.log("create player newPlayer", newPlayer);
  const db = await connect();
  try {
    const stmt = await db.prepare(`INSERT INTO players 
      (team_id, name, sex, contact)
    VALUES
      ( 
        :team_id,
        :name, 
        :sex, 
        :contact
      )
  `);

    stmt.bind({
      ":team_id": newPlayer.team_id,
      ":name": newPlayer.name,
      ":sex": newPlayer.sex,
      ":contact": newPlayer.contact,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

async function getTeams() {
  const db = await connect();
  try {
    const teams = await db.all(`SELECT team_id, 
      team_name
    FROM  Teams
    ORDER BY team_id DESC
    LIMIT 10;
    `);

    console.log("dbConnector got data", teams.length);

    return teams;
  } finally {
    await db.close();
  }
}

async function getTeam(team_id) {
  console.log("Get team team_id", team_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`SELECT 
    team_id, 
    team_name
  FROM  Teams
  WHERE 
    team_id = :team_id    
  `);

    stmt.bind({ ":team_id": team_id });

    const teams = await stmt.all();

    await stmt.finalize();

    return teams;
  } finally {
    await db.close();
  }
}

async function updateTeam(team_id, newTeam) {
  console.log("update team team_id", team_id);
  const db = await connect();
  try {
    const stmt = await db.prepare(`UPDATE Teams  
    SET 
      team_name = :team_name
  WHERE 
    team_id = :team_id    
  `);

    stmt.bind({
      ":team_id": team_id,
      ":team_name": newTeam.team_name,
    });

    const result = await stmt.run();

    await stmt.finalize();

    return result;
  } finally {
    await db.close();
  }
}

module.exports = {
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
  createPlayer,
  getTeams,
  getTeam,
  updateTeam
};
