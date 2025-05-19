
import GlobeLogo from "../assets/world.png";

export default function Header() {
  return (
    <header>
      <div className="header">
                <img className="logo" src={GlobeLogo} alt="world Logo" />
        <span className="title">My Travel Journal</span>
</div>

    </header>
  );
}