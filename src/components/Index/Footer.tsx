import React from "react";
import {
  AiOutlineWhatsApp,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";
export const Footer = () => {
  interface ISocialMedia {
    id: number;
    name: string;
    icon: React.FC;
  }

  const socialMedia = [
    {
      id: 0,
      name: "WhatsApp",
      icon: <AiOutlineWhatsApp className="mx-2" />,
    },
    {
      id: 1,
      name: "Twitter",
      icon: <AiFillTwitterCircle className="mx-2" />,
    },
    {
      id: 2,
      name: "Linkedin",
      icon: <AiFillLinkedin className="mx-2" />,
    },
    {
      id: 3,
      name: "Instagram",
      icon: <AiFillInstagram className="mx-2" />,
    },
  ];
  return (
    <div className="w-100 bg-dark d-flex mt-auto justify-content-center">
      <div className="mx-3 row justify-content-center">
        <h4 className="text-white m-3 text-center">Social Media</h4>
        <hr style={{ color: "white" }} />
        <ul className="d-flex">
          {socialMedia.map((e, index) => {
            return (
              <div key={index} className="col">
                <li
                  className="text-white m-3"
                  style={{ listStyle: "none" }}
                  key={e.id}
                >
                  <a
                    href="#"
                    className="text-decoration-none text-white"
                    key={index}
                  >
                    <span>{e.icon}</span>
                    {e.name}
                  </a>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
