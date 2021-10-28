class TwilioTextMessenger
  attr_reader :message

  def initialize(phone_number, message)
    @phone_number = phone_number
    @message = message
  end

  def sms
    client = Twilio::REST::Client.new
    client.messages.create({
      from: Rails.application.credentials[Rails.env.to_sym][:twilio][:phone_number],
      to: @phone_number,
      body: @message
    })
  end
end