import React from "react";
import { FaLinkedin } from "react-icons/fa"; // Importing LinkedIn icon from react-icons

export const Team = (props) => {
  return (
    <div id="team" className="text-center py-5">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2 className="mb-4">Meet the Team</h2>
          <p className="mb-5">
            Get to know the dedicated team guiding you toward personalized career success.
          </p>
        </div>
        <div id="row" className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team mb-4">
                  <div className="thumbnail">
                    <img src={d.img} alt={d.name} className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      {/* Display LinkedIn ID as a clickable link */}
                      {d.linkedin && (
                        <a
                          href={d.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkedin-link"
                        >
                          <FaLinkedin size={30} color="#0077b5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};
