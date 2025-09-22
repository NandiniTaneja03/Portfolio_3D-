import React from "react";

const Button = ({ text, className, id }) => {
  const handleClick = (e) => {
    e.preventDefault();

    const target = document.getElementById("counter");

    if (target && id) {
      const offset = window.innerHeight * 0.15;
      // height provided to offset the scroll position
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      // scroll to the target position with smooth behavior

      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <a
      id={id}
      className={`${className ?? ""} cta-wrapper`}
      onClick={handleClick}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow down" />
        </div>
      </div>
    </a>
  );
};

export default Button;
