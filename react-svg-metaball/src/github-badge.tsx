import React from "react";

const SRC =
  "https://github.com/agaricide/svg-metaballs/blob/develop/react-svg-metaball/src/App.tsx";

interface Props {
  className: string;
}

const GithubBadge: React.FC<Props> = ({ className }) => {
  return (
    <a className={className} href={SRC}>
      <img
        alt="GitHub Logomark"
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      />
      View on Github
    </a>
  );
};

export default GithubBadge;
