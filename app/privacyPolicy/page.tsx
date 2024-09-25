"use client";
import NavBar from "@/app/components/NavBar";
const PrivacyPolicy: React.FC = () => {
  return (
    <div className="md:px-12 lg:px-16 Xl:px-[3vw]">
      <div className="">
        <NavBar />
      </div>
      <h1 className=" absolute z-[99999] hidden lg:flex lg:left-[20vw] Xl:left-[18vw] top-6 Xl:top-[2.1vw] text-white text-base sm:text-lg Xl:text-[3vh]">
        Privacy Policy
      </h1>
      <div className="relative px-4 pb-4 text-[#CEC7D8]">
        <h1 className="text-4xl text-white Xl:text-[5vh] Xl:leading-[6vh] font-bold mt-8">
          OvaDrive Privacy Policy
        </h1>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          Welcome to OvaDrive, a paradigm-shifting AI Voice Assistant app
          crafted to redefine the realms of personal computing. At OvaDrive, we
          are steadfast in our commitment to safeguarding the privacy and
          security of our users' data. This Privacy Policy elucidates the manner
          in which we collect, utilize, manage, and protect the information
          entrusted to us by our users. By engaging with our app, you are
          consenting to the practices delineated herein.
        </p>
        <h2 className="text-3xl text-white font-semibold mt-6 Xl:mt-[3vh] Xl:text-[4vh] Xl:leading-[5vh]">
          Information Collection and Utilization
        </h2>
        <h2 className="mt-4 Xl:mt-[2vh] text-xl text-white font-semibold Xl:text-[3vh] Xl:leading-[4vh]">
          Compliance with Google API Services User Data Policy:
        </h2>{" "}
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          OvaDrive adheres strictly to Google's Limited Use requirements,
          ensuring responsible use of data obtained from Google APIs. Our
          practices are aligned with Google API Services User Data Policy.
        </p>
        <h2 className="mt-6 Xl:mt-[3vh] text-xl text-white font-semibold Xl:text-[3vh] Xl:leading-[4vh]">
          Voice Recordings:
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          Central to OvaDrive's functionality is its capability to continually
          record and process voice inputs. This ongoing collection is pivotal
          for enabling the app to provide personalized, contextually relevant
          responses and services.
        </p>
        <h2 className="mt-6 Xl:mt-[3vh] text-xl text-white font-semibold Xl:text-[3vh] Xl:leading-[4vh]">
          User Empowerment Over Recordings:
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          We bestow upon our users complete dominion over the recording
          functionality. OvaDrive is preconfigured to perform background
          recording to optimize user experience; however, this feature is at the
          user's discretion to deactivate. Employing the microphone (mic) button
          within the app halts all recording activities, thereby placing the
          control squarely in the user's hands.
        </p>
        <h2 className="mt-6 Xl:mt-[3vh] text-xl text-white font-semibold Xl:text-[3vh] Xl:leading-[4vh]">
          Data Management and Deletion:
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          Recognizing the importance of data sovereignty, OvaDrive offers users
          the ability to meticulously review and selectively delete voice
          recordings, thereby enabling users to exert control over the
          information retained in our systems.
        </p>
        <h2 className="text-2xl text-white font-bold mt-8 Xl:mt-[4vh] Xl:text-[3vh] Xl:leading-[4vh]">
          Sharing and Disclosure of Information
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          Our ethos revolves around maintaining the sanctity of your data. We
          abstain from sharing your personal voice recordings with external
          entities, barring a few exceptions:
        </p>
        <ul className="list-disc list-inside mt-4 Xl:mt-[2vh]">
          <li className="Xl:text-[2.5vh] Xl:leading-[3.8vh]">
            <strong>Use of 3rd Party Services for Voice Transcription:</strong>
            We use Deepgram API for real-time voice transcription. This is an
            essential part of our service, enabling us to provide accurate,
            responsive assistance. We ensure that data shared with Deepgram is
            protected and used only for transcription purposes.
          </li>
          <li className="Xl:text-[2.5vh] Xl:leading-[3.8vh]">
            <strong>Amazon Web Services (AWS) as Backend Server:</strong> To
            ensure robustness and security, OvaDrive employs Amazon Web Services
            (AWS) as its backend server infrastructure. This partnership is
            instrumental in securely hosting and processing your data, including
            voice recordings and user account details.
          </li>
          <li className="Xl:text-[2.5vh] Xl:leading-[3.8vh]">
            <strong>Compliance with Legal Obligations:</strong> We reserve the
            right to disclose specific information if legally mandated to do so
            or as necessary to protect our rights and comply with judicial
            proceedings or government requests.
          </li>
        </ul>
        <h2 className="text-xl text-white font-bold mt-6 Xl:mt-[3vh] Xl:text-[3vh] Xl:leading-[4vh]">
          Data Security
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          The safeguarding of your personal information is a matter of utmost
          importance to us. To this end, we implement a host of security
          measures aimed at protecting your data from unauthorized access,
          alteration, and misuse. Despite these efforts, it is important to
          acknowledge that no method of electronic storage or internet
          transmission can be deemed infallible.
        </p>
        <h2 className="text-xl text-white font-bold mt-6 Xl:mt-[3vh] Xl:text-[3vh] Xl:leading-[4vh]">
          Children's Privacy
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          OvaDrive is not crafted for, nor does it intentionally collect
          information from children under the age of 13. Should it come to our
          attention that we have inadvertently gathered personal data from a
          child under this age threshold, we will take immediate steps to
          expunge such information from our records.
        </p>
        <h2 className="text-xl text-white font-bold mt-6 Xl:mt-[3vh] Xl:text-[3vh] Xl:leading-[4vh]">
          User Rights and Autonomy
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          Our users are afforded various rights in relation to their personal
          data:
        </p>
        <ul className="list-disc list-inside mt-4 Xl:mt-[2vh]">
          <li className="Xl:text-[2.5vh] Xl:leading-[3.8vh]">
            <strong>Access and Control:</strong> You are entitled to peruse and
            manage your voice recordings via the app's interface.
          </li>
          <li className="Xl:text-[2.5vh] Xl:leading-[3.8vh]">
            <strong>Data Deletion:</strong> You possess the prerogative to erase
            any or all of your voice recordings housed in our systems.
          </li>
          <li className="Xl:text-[2.5vh] Xl:leading-[3.8vh]">
            <strong>Recording Discretion:</strong> You retain the liberty to
            deactivate the voice recording feature at your convenience.
          </li>
        </ul>
        <h2 className="text-xl text-white font-bold mt-6 Xl:mt-[3vh] Xl:text-[3vh] Xl:leading-[4vh]">
          Modifications to This Privacy Policy
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          We reserve the exclusive right to amend this Privacy Policy at our
          discretion. Any such revisions will be communicated promptly on this
          page, and your continued usage of OvaDrive following these
          modifications will constitute your agreement to abide by and be bound
          by the altered Privacy Policy.
        </p>
        <h2 className="text-xl text-white font-bold mt-6 Xl:mt-[3vh] Xl:text-[3vh] Xl:leading-[4vh]">
          Contact Information
        </h2>
        <p className="mt-4 Xl:mt-[2vh] Xl:text-[2.5vh] Xl:leading-[3.8vh]">
          Should you have any queries or concerns pertaining to this Privacy
          Policy or your personal data, please do not hesitate to contact us at{" "}
          <a href="mailto:Support@ovadrive.org">Support@ovadrive.org</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
