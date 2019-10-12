import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu.js'
import Grid from '../components/Grid.js'

const mapStateToProps = state => ({

});

/**
 * the main page is the base of the project.
 * it is here that the components will be displayed.
 * @param {*} param0 
 */
const MainPage = ({ dispatch, displayDiagnosis, displayReport}) => ( 
    <div className="main-page">
        <Menu dispatch={dispatch}/>
        <Grid dispatch={dispatch}/>
    </div>
);

export default connect(mapStateToProps)(MainPage);
