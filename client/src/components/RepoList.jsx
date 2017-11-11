import React from 'react';

const RepoList = (props) => (
  <div>
		<div>
		  <h4> Repo List Component </h4>
		  There are {props.repos.length} repos.
		</div>
		<div>
			{props.repos.map((repo, index) => {
					return <li key={repo.repoId}>{repo.userName} - <a href={repo.repoUrl}>{repo.repoName}</a></li>
				})
			}
		</div>
	</div>	
)

export default RepoList;