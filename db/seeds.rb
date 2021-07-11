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
ActiveStorage::Attachment.all.each { |attachment| attachment.purge }

demo_user = User.create!(email: "demo@user.com", password: "123456", username: "joseph", date_of_birth: "22/12/1999")
jo = User.create!(email: "jo@user.com", password: "123456", username: "jo", date_of_birth: "22/12/1999")
isaac = User.create!(email: "isaac@user.com", password: "123456", username: "isaac", date_of_birth: "03/02/1998")
raph = User.create!(email: "raph@user.com", password: "123456", username: "raph", date_of_birth: "26/03/1998")
eric = User.create!(email: "eric@user.com", password: "123456", username: "eric", date_of_birth: "25/11/1997")
kin = User.create!(email: "kin@user.com", password: "123456", username: "kin", date_of_birth: "09/05/1997")
migs = User.create!(email: "migs@user.com", password: "123456", username: "migs", date_of_birth: "06/04/1997")
jack = User.create!(email: "jack@user.com", password: "123456", username: "jack", date_of_birth: "27/10/1996")
chase = User.create!(email: "chase@user.com", password: "123456", username: "chase", date_of_birth: "28/12/1987")

banana = Server.create!(name:"banana", owner_id:2, public:false)
valorant = Server.create!(name:"valorant", owner_id:3, public:true, genre:"gaming")
aa = Server.create!(name:"aa", owner_id:4, public:true, genre:"education")

demo_banana = Membership.create!(user_id:1, server_id:1, description:"server")
jo_banana = Membership.create!(user_id:2, server_id:1, description:"server")
isaac_banana = Membership.create!(user_id:3, server_id:1, description:"server")
raph_banana = Membership.create!(user_id:4, server_id:1, description:"server")
eric_banana = Membership.create!(user_id:5, server_id:1, description:"server")
kin_banana = Membership.create!(user_id:6, server_id:1, description:"server")
jack_banana = Membership.create!(user_id:8, server_id:1, description:"server")
chase_banana = Membership.create!(user_id:9, server_id:1, description:"server")

demo_valorant = Membership.create!(user_id:1, server_id:2, description:"server")
isaac_valorant = Membership.create!(user_id:3, server_id:2, description:"server")
raph_valorant = Membership.create!(user_id:4, server_id:2, description:"server")

demo_aa = Membership.create!(user_id:1, server_id:3, description:"server")
jo_aa = Membership.create!(user_id:2, server_id:3, description:"server")
isaac_aa = Membership.create!(user_id:3, server_id:3, description:"server")
raph_aa = Membership.create!(user_id:4, server_id:3, description:"server")
eric_aa = Membership.create!(user_id:5, server_id:3, description:"server")
kin_aa = Membership.create!(user_id:6, server_id:3, description:"server")
migs_aa = Membership.create!(user_id:7, server_id:3, description:"server")
jack_aa = Membership.create!(user_id:8, server_id:3, description:"server")
chase_aa = Membership.create!(user_id:9, server_id:3, description:"server")

require 'open-uri'
banana_file = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/banana.png')
banana.photo.attach(io: banana_file, filename: 'banana.png')
valorant_file = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/valorant.png')
valorant.photo.attach(io: valorant_file, filename: 'valorant.png')
aa_file = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/aA.png')
aa.photo.attach(io: aa_file, filename: 'aA.png')