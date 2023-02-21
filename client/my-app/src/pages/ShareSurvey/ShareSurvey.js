import { useParams } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import img from "../../assets/images/gummy-no-hand-shake.png";

function ShareSurvey() {
  const { id } = useParams();
  return (
    <div className="div-shareSurvey">
      <div className="div-img">
        <img src={img} alt="undefined" />
      </div>
      <h2>
        Thank you for filling out the survey! <br /> If you like, you can share
        this survey with others:
      </h2>
      <div className="div-shareButton">
        <WhatsappShareButton
          url={`http://localhost:3000/${id}`}
          hashtag={"#opjiohib"}
        >
          <WhatsappIcon size={50} round={true} />
        </WhatsappShareButton>

        <FacebookShareButton
          url={`http://localhost:3000/${id}`}
          hashtag={"#opjiohib"}
        >
          <FacebookIcon size={50} round={true} />
        </FacebookShareButton>

        <EmailShareButton
          url={`http://localhost:3000/${id}`}
          hashtag={"#opjiohib"}
        >
          <EmailIcon size={50} round={true} />
        </EmailShareButton>

        <TwitterShareButton
          url={`http://localhost:3000/${id}`}
          hashtag={"#opjiohib"}
        >
          <TwitterIcon size={50} round={true} />
        </TwitterShareButton>

        <TelegramShareButton
          url={`http://localhost:3000/${id}`}
          hashtag={"#opjiohib"}
        >
          <TelegramIcon size={50} round={true} />
        </TelegramShareButton>
      </div>
    </div>
  );
}

export default ShareSurvey;
