exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("addresses")
    .del()
    .then(() => {
      return knex("users").del();
    })

    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        //value :pass
        {
          username: "admin",
          firstname: "",
          password:
            "$2b$10$eKj/5SBH64kpn3ptqNQk0OcVtGoIhIMvyvivwgXG0v8pvOQUEediq"
        },
        {
          username: "poweruser",
          password:
            "$2b$10$eKj/5SBH64kpn3ptqNQk0OcVtGoIhIMvyvivwgXG0v8pvOQUEediq"
        }
      ]);
    })
    .then(userId => {
      console.log(userId);
      return knex("addresses").insert([
        { user_id: userId, address1: "Rainbow St 45" }
      ]);
    });
};
