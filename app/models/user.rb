# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string(32)       not null
#  email           :string           not null
#  password_digest :string           not null
#  date_of_birth   :date
#  tag             :string(4)        not null
#  country_code    :string
#  phone_number    :string(10)
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :username, presence:true, length: { minimum:2 }
  validates :email, presence:true, uniqueness:true, format: { with: URI::MailTo::EMAIL_REGEXP } 
  validates :password, length: { minimum:6, allow_nil:true }
  validates :password_digest, presence:true
  validates :tag, presence:true
  validates :session_token, presence:true, uniqueness:true

  after_initialize :tag, :ensure_session_token

  def self.find_by_credentials(identifier, password)
    if is_number?(identifier)
      user = User.find_by( phone_number: identifier)
    else
      user = User.find_by(username: indentifier)
    end

    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    save!
    session_token
  end

  def accordTag
    @accordTag ||= username + "#" + tag
  end

  def tag
    @tag ||= tagBuilder
  end

  private
  def tagBuilder
    ("000" + rand(1..9999).to_s)[-4..-1]
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def is_number?(string)
    true if Float(string)
  rescue
    false
  end

  def parseNumber(string)
    allowed = ["(", ")", "-", ".", " "]
    string.split.select { |char| !allowed.includes?(char) }
  end
end
