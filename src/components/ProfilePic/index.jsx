import { useState, useEffect } from 'react';
import './style.css';

const alt = 'Aeden Murray';
const big = '/images/me/big.jpeg';
const small = '/images/me/small.jpeg';

const ProfilePic = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.onload = () => setLoaded(true);
        image.src = big;
    }, []);

    return (
        <div id="profile-pic">
            <img
                width="250"
                height="250"
                className={loaded ? 'loaded' : 'loading'}
                src={loaded ? big : small}
                alt={alt}
            />
        </div>
    );
};

export default ProfilePic;
