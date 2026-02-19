const StudioPolicies = () => {
  return (
    <div className="h-full mt-13 p-10">
      <h1 className="text-white font-bold text-3xl">Terms, Policies & Consent</h1>
      <small className="text-gray-500">TOTATS TATTOO SHOP reserves the right to modify, update, or change these policies at any time without prior notice. Continued booking or services indicate acceptance of the latest version.</small>

      <section className="flex flex-col gap-5 mt-5">

        <div>
            <h2 className="text-yellow-500 font-bold text-xl">Policies:</h2>
            <ul className="text-white list-disc ms-5">
                <li>No refunds after the tattoo session has started.</li>
                <li>Rescheduling is allowed anytime.</li>
                <li>Sessions may require breaks at the discretion of the artist.</li>
                <li>Music may be played during tattoo sessions; selection and volume are at the discretion of the artist or studio, and reasonable client requests may be accommodated when possible.</li>
                <li>Clients must be at least 18 years old and provide valid identification.</li>
                <li>Clients must not be under the influence of drugs or alcohol during the session.</li>
                <li>Clients must disclose any medical conditions or allergies that may affect the tattooing process.</li>
                <li>Pregnant or nursing clients are advised to consult a healthcare professional prior to booking.</li>
                <li>Walk-in clients are accepted based on artist availability; appointments are recommended.</li>
                <li>The studio may take photos or videos of completed tattoos for promotional purposes unless the client opts out.</li>
                <li>Aggressive, disruptive, or disrespectful behavior may result in immediate termination of the session without a refund.</li>
                <li>Operating hours are 8:00am–10:00pm, Monday through Sunday.</li>
            </ul>
        </div>

        <div>
            <h2 className="text-yellow-500 font-bold text-xl">Free Tattoo</h2>
            <ul className="text-white list-disc ms-5">
                <li>Anyone who refer 1 new client will receive a free minimal tattoo (lining only, size of 3x3 inches)</li>
            </ul>
        </div>

        <div>
            <h2 className="text-yellow-500 font-bold text-xl">Client Responsibilities</h2>
            <ul className="text-white list-disc ms-5">
                <li>Arrive on time for appointments; late arrivals may result in shortened sessions or rescheduling.</li>
                <li>Follow all studio policies and instructions from the tattoo artist.</li>
                <li>Communicate openly about design preferences, pain tolerance, and any concerns during the session.</li>
                <li>Take proper care of the tattoo after the session to ensure optimal healing and appearance.</li>
            </ul>
        </div>

        <div>
            <h2 className="text-yellow-500 font-bold text-xl">Scheduling & Appointments</h2>
            <ul className="text-white list-disc ms-5">
                <li>Appointments can be made by the official websiteo or contacting the shop via phone, email, or social media.</li>
                <li>Walk-in clients are accepted based on artist availability; appointments are recommended.</li>
            </ul>
        </div>

        <div>
            <h2 className="text-yellow-500 font-bold text-xl">Acknowledgment & Consent:</h2>
            <ul className="text-white list-disc ms-5">
                <li>By booking an appointment or receiving a tattoo, clients acknowledge that they have read, understood, and agreed to the studio's policies and client responsibilities.</li>
            </ul>
        </div>
        
      </section>
    </div>
  )
}

export default StudioPolicies
