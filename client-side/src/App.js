import logo from './logo.svg';
import './App.css';
// import useState
import { useState } from 'react';
// import bootstrap components
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import icon components
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';
// import custom components
import TableCustom from './components/table';

let dataPlayerAwal = [
	{
		id: 1,
		username: 'tianbuyung',
		email: 'tianbuyung@email.com',
		exp: 100,
		lvl: 1
	},
	{
		id: 2,
		username: 'codechiper',
		email: 'codechiper@email.com',
		exp: 50,
		lvl: 2
	},
	{
		id: 3,
		username: 'lalebo',
		email: 'lalebo@email.com',
		exp: 0,
		lvl: 1
	},
	{
		id: 4,
		username: 'johndoe',
		email: 'johndoe@email.com',
		exp: 75,
		lvl: 4
	}
];

function App() {
	// Data list: username, email, experience, dan lvl
	// 1. Input data list ke dalam FE/react js
	// import useState -> buat define State
	// buat state -> setter getter state
	// inisiasi nilai awal state
	// tampilkan data list ke dalam ui
	const [ player, setPlayer ] = useState([
		{
			id: 1,
			username: 'tianbuyung',
			email: 'tianbuyung@email.com',
			exp: 100,
			lvl: 1
		},
		{
			id: 2,
			username: 'codechiper',
			email: 'codechiper@email.com',
			exp: 50,
			lvl: 2
		},
		{
			id: 3,
			username: 'lalebo',
			email: 'lalebo@email.com',
			exp: 0,
			lvl: 1
		},
		{
			id: 4,
			username: 'johndoe',
			email: 'johndoe@email.com',
			exp: 75,
			lvl: 4
		}
	]);

	const [ formAddPlayer, setFormAddPlayer ] = useState({
		id: '',
		username: '',
		email: '',
		exp: 0,
		lvl: 1
	});

	const changeHandler = (e) => {
		setFormAddPlayer({
			...formAddPlayer,
			[e.target.name]: e.target.value
		});
	};

	//tambahkan function add data
	const addData = () => {
		//alert('function tambah data');
		// let newData = {
		// 	username: 'johndoe',
		// 	email: 'johndoe@email.com',
		// 	exp: 75,
		// 	lvl: 4
		// };
		setPlayer([ ...player, formAddPlayer ]);
		setFormAddPlayer({
			username: '',
			email: '',
			exp: 0,
			lvl: 1
		});
	};

	// search Client Side
	// 2. Search List React
	// buat ui, buat 1 input, 1 button search
	// kita tangkap value
	// kita filter dan bandingkan key dengan input
	// jika ada list,
	// jika tidak ada list kita kosongkan
	const [ search, setSearch ] = useState('');

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	const searchData = () => {
		const resultPlayerTemp = dataPlayerAwal;
		const resultPlayerFinal = resultPlayerTemp.filter((el) => {
			if (
				el.username.search(search) >= 0 ||
				el.email.search(search) >= 0 ||
				el.exp.toString().search(search) >= 0 ||
				el.lvl.toString().search(search) >= 0
			) {
				return el;
			}
		});
		if (search === '') {
			setPlayer(dataPlayerAwal);
		} else {
			setPlayer(resultPlayerFinal);
		}
	};

	// 3. Edit data player
	const [ formEditPlayer, setFormEditPlayer ] = useState({
		id: '',
		username: '',
		email: '',
		exp: 0,
		lvl: 1
	});

	const editData = (idPlayer) => {
		//alert(idPlayer);
		player.filter((el) => {
			if (el.id === idPlayer) {
				setFormEditPlayer(el);
			}
		});
	};

	const editHandler = (e) => {
		setFormEditPlayer({
			...formEditPlayer,
			[e.target.name]: e.target.value
		});
	};

	const editDataPlayer = () => {
		const editDataPlayerTemp = player;
		const editPlayer = player.findIndex((el) => el.id === formEditPlayer.id);
		editDataPlayerTemp[editPlayer].username = formEditPlayer.username;
		editDataPlayerTemp[editPlayer].email = formEditPlayer.email;
		editDataPlayerTemp[editPlayer].exp = formEditPlayer.exp;
		editDataPlayerTemp[editPlayer].lvl = formEditPlayer.lvl;
		setPlayer(editDataPlayerTemp);
		setFormEditPlayer({
			id: '',
			username: '',
			email: '',
			exp: 0,
			lvl: 1
		});
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>

			<Container>
				{/* Search Player */}
				<Form className="d-flex">
					<Form.Control type="text" value={search} onChange={searchHandler} placeholder="Search" />
					<Button variant="outline-success" onClick={searchData}>
						Search
					</Button>
				</Form>

				{/* List of Player */}
				<Row>
					<h1>List of Players</h1>
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Username</th>
								<th scope="col">Email</th>
								<th scope="col">Experience</th>
								<th scope="col">Level</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{// looping state player
							// array []
							player.map((data, index) => {
								return (
									<TableCustom
										key={data.id}
										index={index + 1}
										username={data.username}
										email={data.email}
										exp={data.exp}
										lvl={data.lvl}
										action={() => editData(data.id)}
										nameBtn={<FaUserEdit />}
									/>
								);
							})}
						</tbody>
					</Table>
				</Row>

				<Row className="justify-content-md-center">
					{/* Form Add Player */}
					<Col xs={6}>
						<h1>Add Player</h1>
						<Form>
							<Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
								<Form.Label column sm={2}>
									Username
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										type="text"
										value={formAddPlayer.username}
										name="username"
										onChange={changeHandler}
										placeholder="Username"
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
								<Form.Label column sm={2}>
									Email
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										type="email"
										value={formAddPlayer.email}
										name="email"
										onChange={changeHandler}
										placeholder="Email"
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formHorizontalExp">
								<Form.Label column sm={2}>
									Experience
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										type="number"
										value={formAddPlayer.exp}
										name="exp"
										onChange={changeHandler}
										placeholder="Experience"
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formHorizontalLvl">
								<Form.Label column sm={2}>
									Level
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										type="number"
										value={formAddPlayer.lvl}
										name="lvl"
										onChange={changeHandler}
										placeholder="Level"
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3">
								<Col sm={{ span: 10, offset: 1 }}>
									<Button variant="primary" onClick={addData}>
										Add Player <AiOutlineUserAdd />
									</Button>
								</Col>
							</Form.Group>
						</Form>
					</Col>

					{/* Form Edit Player */}
					<Col xs={6}>
						<h1>Edit Player</h1>
						<Form>
							<Form.Group as={Row} className="mb-3" controlId="formHorizontalId">
								<Form.Label column sm={2}>
									ID
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="number" value={formEditPlayer.id} name="id" placeholder="ID" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formHorizontalUsername">
								<Form.Label column sm={2}>
									Username
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										type="text"
										value={formEditPlayer.username}
										name="username"
										onChange={editHandler}
										placeholder="Username"
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
								<Form.Label column sm={2}>
									Email
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										type="email"
										value={formEditPlayer.email}
										name="email"
										onChange={editHandler}
										placeholder="Email"
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formHorizontalExp">
								<Form.Label column sm={2}>
									Experience
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										type="number"
										value={formEditPlayer.exp}
										name="exp"
										onChange={editHandler}
										placeholder="Experience"
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formHorizontalLvl">
								<Form.Label column sm={2}>
									Level
								</Form.Label>
								<Col sm={10}>
									<Form.Control
										type="number"
										value={formEditPlayer.lvl}
										name="lvl"
										onChange={editHandler}
										placeholder="Level"
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3">
								<Col sm={{ span: 10, offset: 1 }}>
									<Button variant="warning" onClick={editDataPlayer}>
										Edit Player <FaUserEdit />
									</Button>
								</Col>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
