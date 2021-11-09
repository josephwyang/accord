class TwilioTextMessenger
  attr_reader :message

  def initialize(phone_number, message)
    @phone_number = phone_number
    @message = message
  end

  def sms
    client = Twilio::REST::Client.new
    client.messages.create({
      from: Rails.env == "development" ? Rails.application.credentials.twilio[:phone_number] : ENV["PHONE_NUMBER"],
      to: @phone_number,
      body: @message
    })
  end
end