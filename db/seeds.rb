# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

User.delete_all
User.connection.execute('ALTER SEQUENCE users_id_seq RESTART WITH 1')
Friendship.delete_all
Friendship.connection.execute('ALTER SEQUENCE friendships_id_seq RESTART WITH 1')
Server.delete_all
Server.connection.execute('ALTER SEQUENCE servers_id_seq RESTART WITH 1')
Channel.delete_all
Channel.connection.execute('ALTER SEQUENCE channels_id_seq RESTART WITH 1')
Membership.delete_all
Membership.connection.execute('ALTER SEQUENCE memberships_id_seq RESTART WITH 1')
Message.delete_all
Message.connection.execute('ALTER SEQUENCE messages_id_seq RESTART WITH 1')
Reaction.delete_all
Reaction.connection.execute('ALTER SEQUENCE messages_id_seq RESTART WITH 1')
ActiveStorage::Attachment.all.each { |attachment| attachment.purge }

# users
demo_user = User.create!(email: "demo@user.com", password: "123456", username: "demo", date_of_birth: "22/12/1999")
jo = User.create!(email: "jo@user.com", password: "123456", username: "jo", date_of_birth: "22/12/1999")
isaac = User.create!(email: "isaac@user.com", password: "123456", username: "isaac", date_of_birth: "03/02/1998")
raph = User.create!(email: "raph@user.com", password: "123456", username: "raph", date_of_birth: "26/03/1998")
eric = User.create!(email: "eric@user.com", password: "123456", username: "eric", date_of_birth: "25/11/1997")
kin = User.create!(email: "kin@user.com", password: "123456", username: "kin", date_of_birth: "09/05/1997")
migs = User.create!(email: "migs@user.com", password: "123456", username: "migs", date_of_birth: "06/04/1997")
jack = User.create!(email: "jack@user.com", password: "123456", username: "jack", date_of_birth: "27/10/1996")
chase = User.create!(email: "chase@user.com", password: "123456", username: "chase", date_of_birth: "28/12/1987")

# friendships
jo_friend = Friendship.create!(user_id: 2, friend_id: 1, accepted: true)
isaac_friend = Friendship.create!(user_id: 1, friend_id: 3, accepted: true)
raph_friend = Friendship.create!(user_id: 4, friend_id: 1)
eric_friend = Friendship.create!(user_id: 5, friend_id: 1)
kin_friend = Friendship.create!(user_id: 6, friend_id: 1)
migs_friend = Friendship.create!(user_id: 1, friend_id: 7)
jack_friend = Friendship.create!(user_id: 1, friend_id: 8)
chase_friend = Friendship.create!(user_id: 1, friend_id: 9)

# demo servers
banana = Server.create!(name:"banana", owner_id:1, public:false, genre:"createMyOwn", description: "Join banana to meet real life App Academy students!")
maplestory = Server.create!(name:"Maplestory", owner_id:8, public:true, genre:"gaming", description: "Discover your story! Maplestory delivers legendary MMORPG adventures with boldly original icon 2D charm.")
study_together = Server.create!(name:"study together", owner_id:6, public:true, genre:"education", description: "come study with us!")
react = Server.create!(name:"React", owner_id:2, public:true, genre:"scienceAndTech", description: "Stay up to date on everything React.js! The #1 server meet other React users and join developing React projects.")

# education servers
aa = Server.create!(name:"App Academy (aA)", owner_id:2, public:true, genre:"education", description: "Welcome to App Academy, a leading institution in the massive boom of intensive bootcamps.")
english = Server.create!(name:"English", owner_id:2, public:true, genre:"education", description: "Learn English today. Practice your skills with thousands of native speakers and other eager learners. It's never too late!")
khan_academy = Server.create!(name:"Khan Academy", owner_id:2, public:true, genre:"education", description: "A free world-class education for anyone, anywhere.")

# entertainment servers
demon_slayer = Server.create!(name:"Demon Slayer", owner_id:2, public:true, genre:"entertainment", description: "Loving, cute and active community. Join our server to view sneak peeks.")
naruto = Server.create!(name:"NARUTO WRLD", owner_id:2, public:true, genre:"entertainment", description: "An anime community for Naruto/Boruto fans! Join the #1 Naruto Discord today!")
my_hero_academia = Server.create!(name:"My Hero Academia", owner_id:2, public:true, genre:"entertainment", description: "My Hero Academia fandom! Join for exclusive content and a friendly anime community.")

# gaming servers
league = Server.create!(name:"League of Legends", owner_id:2, public:true, genre:"gaming", description: "Welcome to League of Legends! A community-run Discord server for all things LoL.")
smash = Server.create!(name:"Super Smash Bros.", owner_id:2, public:true, genre:"gaming", description: "The largest and #1 Smash server! Active channels, matchmaking for all players, events, content, creators, and much more! Join us today to brawl!")
fortnite = Server.create!(name:"Fortnite", owner_id:2, public:true, genre:"gaming", description: "The official Fortnite discord server! Join to follow news channels, LFG, and chat.")
minecraft = Server.create!(name:"MINECRAFT", owner_id:2, public:true, genre:"gaming", description: "The official Minecraft Discord!")
valorant = Server.create!(name:"VALORANT", owner_id:2, public:true, genre:"gaming", description: "The VALORANT Discord server. We offer the latest news and various chats.")

# music servers
blackpink = Server.create!(name:"BLACKPINK", owner_id:2, public:true, genre:"music", description: "Welcome to the place to be for anything BLACKPINK! Join to stay up to date with BLACKPINK, exclusive content, and talk with fellow BLINKs!")
groovy = Server.create!(name:"Groovy Community", owner_id:2, public:true, genre:"music", description: "Official community for Groovy Discord bot. Join for events, giveaways, support, and a cool community.")
itzy = Server.create!(name:"ITZY (있지)", owner_id:2, public:true, genre:"music", description: "The discord server for KPOP girl group ITZY. Come join fellow MIDZYs and stay updated on everything ITZY, from newest music releases to exclusive fan content.")
lofi = Server.create!(name:"lofi", owner_id:2, public:true, genre:"music", description: "bring a cup of coffee and vibe to lofi with us")

# scienceAndTech servers
google = Server.create!(name:"Google", owner_id:2, public:true, genre:"scienceAndTech", description: "Discuss and get technical support with Google products and services.")
apple = Server.create!(name:"r/Apple", owner_id:2, public:true, genre:"scienceAndTech", description: "The original and largest Apple server. Affiliated with the r/Apple subreddit. Join for the latest news and updates.")
css = Server.create!(name:"CSS", owner_id:2, public:true, genre:"scienceAndTech", description: "Join to learn CSS, the leading style sheet language.")
javascript = Server.create!(name:"JavaScript", owner_id:2, public:true, genre:"scienceAndTech", description: "Javascript, or JS, is a programming language with dynamic typing and prototype-based object orientation. Join to get tips and share exciting projects.")
python = Server.create!(name:"Python", owner_id:2, public:true, genre:"scienceAndTech", description: "The leading programming language worldwide.")
rails = Server.create!(name:"Ruby on Rails", owner_id:2, public:true, genre:"scienceAndTech", description: "RoR is a server-side web application framework written in Ruby.")
ruby = Server.create!(name:"Ruby Programming Language", owner_id:2, public:true, genre:"scienceAndTech", description: "Designed and developed by Yukihiro Matsumoto.")

# demo server channels
banana_general = Channel.create!(name:"general", server_id:1)
banana_leetcodes = Channel.create!(name:"leetcodes", server_id:1)
maplestory_general = Channel.create!(name:"general", server_id:2)
maplestory_gaming = Channel.create!(name:"gaming", server_id:2)
maplestory_highlights = Channel.create!(name:"highlights", server_id:2)
study_together_general = Channel.create!(name:"general", server_id:3)
study_together_q_and_a = Channel.create!(name:"q-and-a", server_id:3)

# education server channels
aa_general = Channel.create!(name:"general", server_id:4)
english_general = Channel.create!(name:"general", server_id:5)
khan_academy_general = Channel.create!(name:"general", server_id:6)

aa_q_and_a = Channel.create!(name:"q-and-a", server_id:4)
english_q_and_a = Channel.create!(name:"q-and-a", server_id:5)
khan_academy_q_and_a = Channel.create!(name:"q-and-a", server_id:6)

# entertainment server channels
demon_slayer_general = Channel.create!(name:"general", server_id:7)
naruto_general = Channel.create!(name:"general", server_id:8)
my_hero_academia_general = Channel.create!(name:"general", server_id:9)

demon_slayer_clips = Channel.create!(name:"clips", server_id:7)
naruto_clips = Channel.create!(name:"clips", server_id:8)
my_hero_academia_clips = Channel.create!(name:"clips", server_id:9)

# gaming server channels
league_general = Channel.create!(name:"general", server_id:10)
smash_general = Channel.create!(name:"general", server_id:11)
fortnite_general = Channel.create!(name:"general", server_id:12)
minecraft_general = Channel.create!(name:"general", server_id:13)
valorant_general = Channel.create!(name:"general", server_id:14)

league_gaming = Channel.create!(name:"gaming", server_id:10)
smash_gaming = Channel.create!(name:"gaming", server_id:11)
fortnite_gaming = Channel.create!(name:"gaming", server_id:12)
minecraft_gaming = Channel.create!(name:"gaming", server_id:13)
valorant_gaming = Channel.create!(name:"gaming", server_id:14)

league_highlights = Channel.create!(name:"highlights", server_id:10)
smash_highlights = Channel.create!(name:"highlights", server_id:11)
fortnite_highlights = Channel.create!(name:"highlights", server_id:12)
minecraft_highlights = Channel.create!(name:"highlights", server_id:13)
valorant_highlights = Channel.create!(name:"highlights", server_id:14)

smash_tournaments = Channel.create!(name:"tournaments", server_id:11)
maplestory_boss_runs = Channel.create!(name:"boss-runs", server_id:13)

# music server channels
blackpink_general = Channel.create!(name:"general", server_id:15)
groovy_general = Channel.create!(name:"general", server_id:16)
itzy_general = Channel.create!(name:"general", server_id:17)
lofi_general = Channel.create!(name:"general", server_id:18)

blackpink_trending = Channel.create!(name:"trending", server_id:15)
groovy_trending = Channel.create!(name:"trending", server_id:16)
itzy_trending = Channel.create!(name:"trending", server_id:17)
lofi_trending = Channel.create!(name:"trending", server_id:18)

groovy_recommendations = Channel.create!(name:"recommendations", server_id:16)
lofi_recommendations = Channel.create!(name:"recommendations", server_id:18)

# scienceAndTech server channels
google_general = Channel.create!(name:"general", server_id:19)
apple_general = Channel.create!(name:"general", server_id:20)
css_general = Channel.create!(name:"general", server_id:21)
javascript_general = Channel.create!(name:"general", server_id:22)
python_general = Channel.create!(name:"general", server_id:23)
rails_general = Channel.create!(name:"general", server_id:24)
react_general = Channel.create!(name:"general", server_id:25)
ruby_general = Channel.create!(name:"general", server_id:26)

google_latest_news = Channel.create!(name:"latest-news", server_id:19)
apple_latest_news = Channel.create!(name:"latest-news", server_id:20)
css_latest_news = Channel.create!(name:"latest-news", server_id:21)
javascript_latest_news = Channel.create!(name:"latest-news", server_id:22)
python_latest_news = Channel.create!(name:"latest-news", server_id:23)
rails_latest_news = Channel.create!(name:"latest-news", server_id:24)
react_latest_news = Channel.create!(name:"latest-news", server_id:25)
ruby_latest_news = Channel.create!(name:"latest-news", server_id:26)

# memberships
demo_banana = Membership.create!(user_id:1, server_id:1, description:"server")
jo_banana = Membership.create!(user_id:2, server_id:1, description:"server")
isaac_banana = Membership.create!(user_id:3, server_id:1, description:"server")
raph_banana = Membership.create!(user_id:4, server_id:1, description:"server")
eric_banana = Membership.create!(user_id:5, server_id:1, description:"server")
kin_banana = Membership.create!(user_id:6, server_id:1, description:"server")
jack_banana = Membership.create!(user_id:8, server_id:1, description:"server")
chase_banana = Membership.create!(user_id:9, server_id:1, description:"server")

jack_maplestory = Membership.create!(user_id:8, server_id:2, description:"server")
demo_maplestory = Membership.create!(user_id:1, server_id:2, description:"server")
eric_maplestory = Membership.create!(user_id:5, server_id:2, description:"server")
jo_maplestory = Membership.create!(user_id:2, server_id:2, description:"server")
isaac_maplestory = Membership.create!(user_id:3, server_id:2, description:"server")
raph_maplestory = Membership.create!(user_id:4, server_id:2, description:"server")

demo_study_together = Membership.create!(user_id:1, server_id:3, description:"server")
jo_study_together = Membership.create!(user_id:2, server_id:3, description:"server")
isaac_study_together = Membership.create!(user_id:3, server_id:3, description:"server")
raph_study_together = Membership.create!(user_id:4, server_id:3, description:"server")
eric_study_together = Membership.create!(user_id:5, server_id:3, description:"server")
kin_study_together = Membership.create!(user_id:6, server_id:3, description:"server")
migs_study_together = Membership.create!(user_id:7, server_id:3, description:"server")
jack_study_together = Membership.create!(user_id:8, server_id:3, description:"server")
chase_study_together = Membership.create!(user_id:9, server_id:3, description:"server")

# owner membership for each server
jo_aa = Membership.create!(user_id:2, server_id:4, description:"server")
jo_english = Membership.create!(user_id:2, server_id:5, description:"server")
jo_khan_academy = Membership.create!(user_id:2, server_id:6, description:"server")
jo_demon_slayer = Membership.create!(user_id:2, server_id:7, description:"server")
jo_my_hero_academia = Membership.create!(user_id:2, server_id:8, description:"server")
jo_naruto = Membership.create!(user_id:2, server_id:9, description:"server")
jo_league = Membership.create!(user_id:2, server_id:10, description:"server")
jo_smash = Membership.create!(user_id:2, server_id:11, description:"server")
jo_fortnite = Membership.create!(user_id:2, server_id:12, description:"server")
jo_minecraft = Membership.create!(user_id:2, server_id:13, description:"server")
jo_valorant = Membership.create!(user_id:2, server_id:14, description:"server")
jo_blackpink = Membership.create!(user_id:2, server_id:15, description:"server")
jo_groovy = Membership.create!(user_id:2, server_id:16, description:"server")
jo_itzy = Membership.create!(user_id:2, server_id:17, description:"server")
jo_lofi = Membership.create!(user_id:2, server_id:18, description:"server")
jo_apple = Membership.create!(user_id:2, server_id:19, description:"server")
jo_css = Membership.create!(user_id:2, server_id:20, description:"server")
jo_google = Membership.create!(user_id:2, server_id:21, description:"server")
jo_javascript = Membership.create!(user_id:2, server_id:22, description:"server")
jo_python = Membership.create!(user_id:2, server_id:23, description:"server")
jo_react = Membership.create!(user_id:2, server_id:25, description:"server")
jo_rails = Membership.create!(user_id:2, server_id:24, description:"server")
jo_ruby = Membership.create!(user_id:2, server_id:26, description:"server")

# random memberships for each server
(4..26).each do |server_id|
  (3..9).to_a.sample(rand(3..7)).each do |user_id|
    Membership.create!(user_id:user_id, server_id:server_id, description:"server")
  end
end

# dms
jo_dm = Server.create!(name:"dm", owner_id:2, public:false, genre:"dm")
isaac_dm = Server.create!(name:"dm", owner_id:3, public:false, genre:"dm")

jo_channel = Channel.create!(name:"dm", server_id:27)
isaac_channel = Channel.create!(name:"dm", server_id:28)

demo_jo = Membership.create!(user_id:1, server_id:27, description:"dm")
demo_isaac = Membership.create!(user_id:1, server_id:28, description:"dm")
jo_demo = Membership.create!(user_id:2, server_id:27, description:"dm")
isaac_demo = Membership.create!(user_id:3, server_id:28, description:"dm")

# gcs
demo_raph_eric_gc = Server.create!(name:"demo, raph, eric", owner_id:4, public:false, genre:"gc")

demo_raph_eric_channel = Channel.create!(name:"gc", server_id:29)

demo_gc = Membership.create!(user_id:1, server_id:29, description:"gc")
raph_gc = Membership.create!(user_id:4, server_id:29, description:"gc")
eric_gc = Membership.create!(user_id:5, server_id:29, description:"gc")

require 'open-uri'

# demo server profiles
banana_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/banana.png')
banana.icon.attach(io: banana_icon, filename: 'banana')
banana_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/banana.jpeg')
banana.banner.attach(io: banana_banner, filename: 'banana')

# server icons
blackpink_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/blackpink.jpeg')
blackpink.icon.attach(io: blackpink_icon, filename: 'blackpink')
demon_slayer_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/demon-slayer.jpeg')
demon_slayer.icon.attach(io: demon_slayer_icon, filename: 'demon-slayer')
fortnite_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/fortnite.jpeg')
fortnite.icon.attach(io: fortnite_icon, filename: 'fortnite')
google_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/google.jpeg')
google.icon.attach(io: google_icon, filename: 'google')
groovy_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/groovy.jpeg')
groovy.icon.attach(io: groovy_icon, filename: 'groovy')
itzy_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/itzy.jpeg')
itzy.icon.attach(io: itzy_icon, filename: 'itzy')
maplestory_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/maplestory.jpeg')
maplestory.icon.attach(io: maplestory_icon, filename: 'maplestory')
minecraft_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/minecraft.jpeg')
minecraft.icon.attach(io: minecraft_icon, filename: 'minecraft')
naruto_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/naruto.jpeg')
naruto.icon.attach(io: naruto_icon, filename: 'naruto')

aa_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/aA.png')
aa.icon.attach(io: aa_icon, filename: 'aA')
apple_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/apple.png')
apple.icon.attach(io: apple_icon, filename: 'apple')
css_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/css.png')
css.icon.attach(io: css_icon, filename: 'css')
english_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/english.png')
english.icon.attach(io: english_icon, filename: 'english')
javascript_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/javascript.png')
javascript.icon.attach(io: javascript_icon, filename: 'javascript')
khan_academy_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/khan-academy.png')
khan_academy.icon.attach(io: khan_academy_icon, filename: 'khan-academy')
league_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/league.png')
league.icon.attach(io: league_icon, filename: 'league')
lofi_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/lofi.png')
lofi.icon.attach(io: lofi_icon, filename: 'lofi')
my_hero_academia_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/my-hero-academia.png')
my_hero_academia.icon.attach(io: my_hero_academia_icon, filename: 'my-hero-academia')
python_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/python.png')
python.icon.attach(io: python_icon, filename: 'python')
rails_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/rails.png')
rails.icon.attach(io: rails_icon, filename: 'rails')
react_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/react.png')
react.icon.attach(io: react_icon, filename: 'react')
ruby_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/ruby.png')
ruby.icon.attach(io: ruby_icon, filename: 'ruby')
smash_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/smash.png')
smash.icon.attach(io: smash_icon, filename: 'smash')
study_together_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/study-together.png')
study_together.icon.attach(io: study_together_icon, filename: 'study-together')
valorant_icon = open('https://accord-chat-seeds.s3.amazonaws.com/server-icons/valorant.png')
valorant.icon.attach(io: valorant_icon, filename: 'valorant')

# server banners
english_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/english.jpg')
english.banner.attach(io: english_banner, filename: 'english')

aa_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/aA.jpeg')
aa.banner.attach(io: aa_banner, filename: 'aA')
apple_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/apple.jpeg')
apple.banner.attach(io: apple_banner, filename: 'apple')
blackpink_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/blackpink.jpeg')
blackpink.banner.attach(io: blackpink_banner, filename: 'blackpink')
css_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/css.jpeg')
css.banner.attach(io: css_banner, filename: 'css')
demon_slayer_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/demon-slayer.jpeg')
demon_slayer.banner.attach(io: demon_slayer_banner, filename: 'demon-slayer')
fortnite_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/fortnite.jpeg')
fortnite.banner.attach(io: fortnite_banner, filename: 'fortnite')
google_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/google.jpeg')
google.banner.attach(io: google_banner, filename: 'google')
itzy_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/itzy.jpeg')
itzy.banner.attach(io: itzy_banner, filename: 'itzy')
league_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/league.jpeg')
league.banner.attach(io: league_banner, filename: 'league')
lofi_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/lofi.jpeg')
lofi.banner.attach(io: lofi_banner, filename: 'lofi')
maplestory_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/maplestory.jpeg')
maplestory.banner.attach(io: maplestory_banner, filename: 'maplestory')
minecraft_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/minecraft.jpeg')
minecraft.banner.attach(io: minecraft_banner, filename: 'minecraft')
my_hero_academia_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/my-hero-academia.jpeg')
my_hero_academia.banner.attach(io: my_hero_academia_banner, filename: 'my-hero-academia')
naruto_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/naruto.jpeg')
naruto.banner.attach(io: naruto_banner, filename: 'naruto')
python_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/python.jpeg')
python.banner.attach(io: python_banner, filename: 'python')
rails_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/rails.jpeg')
rails.banner.attach(io: rails_banner, filename: 'rails')
react_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/react.jpeg')
react.banner.attach(io: react_banner, filename: 'react')
smash_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/smash.jpeg')
smash.banner.attach(io: smash_banner, filename: 'smash')
study_together_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/study-together.jpeg')
study_together.banner.attach(io: study_together_banner, filename: 'study-together')
valorant_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/valorant.jpeg')
valorant.banner.attach(io: valorant_banner, filename: 'valorant')

groovy_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/groovy.png')
groovy.banner.attach(io: groovy_banner, filename: 'groovy')
javascript_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/javascript.png')
javascript.banner.attach(io: javascript_banner, filename: 'javascript')
khan_academy_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/khan-academy.png')
khan_academy.banner.attach(io: khan_academy_banner, filename: 'khan-academy')
ruby_banner = open('https://accord-chat-seeds.s3.amazonaws.com/server-banners/ruby.png')
ruby.banner.attach(io: ruby_banner, filename: 'ruby')

# profile photos
jo_profile_photo = open('https://accord-chat-seeds.s3.amazonaws.com/profile-photos/jo.png')
jo.profile_photo.attach(io: jo_profile_photo, filename: 'jo')
isaac_profile_photo = open('https://accord-chat-seeds.s3.amazonaws.com/profile-photos/isaac.jpg')
isaac.profile_photo.attach(io: isaac_profile_photo, filename: 'isaac')
raph_profile_photo = open('https://accord-chat-seeds.s3.amazonaws.com/profile-photos/raph.png')
raph.profile_photo.attach(io: raph_profile_photo, filename: 'raph')
eric_profile_photo = open('https://accord-chat-seeds.s3.amazonaws.com/profile-photos/eric.png')
eric.profile_photo.attach(io: eric_profile_photo, filename: 'eric')
kin_profile_photo = open('https://accord-chat-seeds.s3.amazonaws.com/profile-photos/kin.png')
kin.profile_photo.attach(io: kin_profile_photo, filename: 'kin')
migs_profile_photo = open('https://accord-chat-seeds.s3.amazonaws.com/profile-photos/migs.jpg')
migs.profile_photo.attach(io: migs_profile_photo, filename: 'migs')
jack_profile_photo = open('https://accord-chat-seeds.s3.amazonaws.com/profile-photos/jack.png')
jack.profile_photo.attach(io: jack_profile_photo, filename: 'jack')
chase_profile_photo = open('https://accord-chat-seeds.s3.amazonaws.com/profile-photos/chase.png')
chase.profile_photo.attach(io: chase_profile_photo, filename: 'chase')

Message.create!(sender_id:2, channel_id:1, body:"hi, this is banana")
Message.create!(sender_id:3, channel_id:2, body:"wow, let's do leetcodes")
Message.create!(sender_id:4, channel_id:3, body:"who wants to play valorant with me?")