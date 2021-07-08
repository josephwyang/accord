# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
User.connection.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1')
Server.delete_all
Server.connection.execute('ALTER SEQUENCE servers_id_seq RESTART WITH 1')
Membership.delete_all
Membership.connection.execute('ALTER SEQUENCE servers_id_seq RESTART WITH 1')

demo_user = User.create!(email: "demo@user.com", password: "password", username: "joseph", date_of_birth: "22/12/1998")
jo = User.create!(email: "jo@sexy.com", password: "password", username: "jo", date_of_birth: "22/12/1998")
isaac = User.create!(email: "isaac@jerk.com", password: "password", username: "isaac", date_of_birth: "03/02/1997")
eric = User.create!(email: "eric@uwu.com", password: "password", username: "eric", date_of_birth: "25/11/1996")

banana = Server.create!(name:"banana", owner_id:2)
aA = Server.create!(name:"aA", owner_id:3, public:true, genre:"education")

jo_banana = Membership.create!(user_id:2, server_id:1, description:"server")
isaac_banana = Membership.create!(user_id:3, server_id:1, description:"server")
eric_banana = Membership.create!(user_id:4, server_id:1, description:"server")

jo_aA = Membership.create!(user_id:2, server_id:2, description:"server")