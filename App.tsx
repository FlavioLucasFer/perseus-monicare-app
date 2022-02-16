import React from 'react';
import Toast from 'react-native-toast-message';
import {
	Router,
	Scene,
} from 'react-native-router-flux';

import Login from '@screens/Login';
import Measurements from '@screens/Measurements';

const App = () => {
  return (
		<>
			<Router>
				<Scene key='root'>
					<Scene
						key='login'
						component={Login}
						initial
						hideNavBar
					/>

					<Scene
						key='measurements'
						component={Measurements}
						hideNavBar
						init
						type='reset'
					/>
				</Scene>
			</Router>

			<Toast />
		</>
  );
};

export default App;
