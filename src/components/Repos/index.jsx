import { useState, useEffect } from 'react';
import './style.css';

const Repo = ({ name, desc, url }) => (
    <div className="repo">
        <a href={url} target="_blank" rel="noreferrer">
            <div>
                <p className="repo-name">{name}</p>
                <p className="repo-desc">{desc}</p>
            </div>

            <ion-icon name="cube-outline" />
        </a>
    </div>
);

const Repos = () => {
    const [error, setError] = useState(false);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/users/aedenmurray/repos')
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                const hide = ['aedenmurray'];
                const reposToShow = data.filter(
                    (repo) => !hide.includes(repo.name),
                );

                setRepos(
                    reposToShow.map((repo) => ({
                        name: repo.name,
                        desc: repo.description,
                        url: repo.html_url,
                    })),
                );
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    return (
        <div id="repos">
            {error ? (
                <p id="repos-error">Error fetching GitHub repositories!</p>
            ) : (
                repos.map((repo) => (
                    <Repo
                        key={repo.name}
                        name={repo.name}
                        desc={repo.desc}
                        url={repo.url}
                    />
                ))
            )}
        </div>
    );
};

export default Repos;
