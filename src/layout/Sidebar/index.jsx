import ProfilePic from '../../components/ProfilePic';
import LinkedInIcon from './icons/LinkedInIcon';
import GithubIcon from './icons/GithubIcon';
import './style.css';

function Sidebar() {
  return (
    <div id="sidebar">
      <div className="center">
        <ProfilePic />

        <div id="contact">
          <h1>Aeden Murray</h1>
          <p>aeden@aedenmurray.dev</p>
          <div id="socials">
            <a
              href="https://www.linkedin.com/in/aedenmurray"
              rel="noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </a>

            <a
              href="https://github.com/aedenmurray"
              rel="noreferrer"
              target="_blank"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
