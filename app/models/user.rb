# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string(32)       not null
#  email           :string           not null
#  password_digest :string           not null
#  date_of_birth   :date             not null
#  tag             :string(4)        not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  phone_number    :string(15)
#
class User < ApplicationRecord
  validates :username, presence:true, length: { minimum:2, maximum:32 }, uniqueness: { scope: :tag }
  validate :username_valid
  validates :tag, presence:true, length: { minimum:4, maximum:4 }
  validates :accord_tag, presence:true
  validates :email, presence:true, uniqueness:true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum:6, allow_nil:true }
  validates :password_digest, presence:true
  validates :date_of_birth, presence:true
  validates :session_token, presence:true, uniqueness:true
  validates :phone_number, uniqueness:true, length: { maximum:15}, if: :phone_number_given?

  after_initialize :ensure_session_token, :accord_tag
  attr_reader :password

  has_many :owned_servers,
    foreign_key: :owner_id,
    class_name: :Server,
    dependent: :destroy

  def username_valid
    errors.add(:username, :exclusion, message: "cannot contain @ or #") if %w(@ #).any? { |char| username.include?(char) }
  end
  
  def self.find_by_credentials(identifier, password)
    if is_number?(identifier)
      user = find_by_phone_number(identifier)
    else
      user = User.find_by(email: identifier)
    end

    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def self.is_number?(string)
    true if Integer(string)
  rescue
    false
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end


  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def accord_tag
    self.tag ||= tagBuilder
    @accord_tag ||= username + "#" + tag
  end

  def phone_number=(number)
    @phone_number = parse_number(number)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    save!
    session_token
  end

  private
  def find_by_phone_number(number)
    User.find_by(number) || User.find_by("1" + number);
  end

  def tagBuilder
    ("000" + rand(1..9999).to_s)[-4..-1]
  end

  def parse_number(string)
    allowed = ["(", ")", "-", ".", " "]
    string.split("").select do |char|
      if !allowed.include?(char)
        begin
          Integer(char)
          true
        rescue
          raise "invalid character " + char
        end
      else
        false
      end
    end.join
  end

  def phone_number_given?
    !!self.phone_number
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end
end
