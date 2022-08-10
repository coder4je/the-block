# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'


puts("Delete all old data")
User.destroy_all
UserProject.destroy_all
Project.destroy_all

#User

puts("Seed starts")
20.times do 
  User.create(
    username: Faker::Name.name,
    email: Faker::Internet.email,
    password: Faker::Code.nric,
    phone_number: Faker::PhoneNumber.cell_phone,
    picture: Faker::LoremFlickr.image,
  )
end


#Project

p1 = Project.create(
    name: "Software Development",
    description: "Developing general software projects",
    start_date: Date.new(2022, 9, 1),
  end_date: Date.new(2024, 9, 1),
)
p2 = Project.create(
  name: "11 Barodway Interior Project",
  description: "FlatIron School Extension",
  start_date: Date.new(2022, 8, 1),
  end_date: Date.new(2023, 4, 1),
)
p3 = Project.create(
  name: "60 days Diet Plan",
  description: "Being healthy",
  start_date: Date.new(2022, 9, 1),
  end_date: Date.new(2022, 11, 1),
)




#UserProject
20.times do 
  UserProject.create(
    project_id: Project.all.sample.id,
    user_id: User.all.sample.id,
  )
end



puts("Seed done")