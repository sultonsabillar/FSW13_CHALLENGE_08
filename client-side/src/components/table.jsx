import React from 'react';

const Table = ({ keys, index, username, email, exp, lvl, action, nameBtn }) => {
	return (
		<tr key={keys}>
			<th scope="row">{index}</th>
			<td>{username}</td>
			<td>{email}</td>
			<td>{exp}</td>
			<td>{lvl}</td>
			<td>
				<button className="btn btn-warning" onClick={action}>
					{nameBtn}
				</button>
			</td>
		</tr>
	);
};

export default Table;
