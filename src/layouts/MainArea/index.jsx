import Repos from '../../components/Repos';
import Shell from '../../components/Shell';
import './style.css';

const MainArea = () => {
    return (
        <div id="main-area">
            <Shell />
            <Repos />
        </div>
    );
};

export default MainArea;
