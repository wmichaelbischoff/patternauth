import React, { Component } from 'react';
import './NineAuth.css';
import LineTo from 'react-lineto';
import axios from 'axios'

class NineAuth extends Component {
    constructor() {
        super()
        this.state = {
            Aone: false,
            Atwo: false,
            Athree: false,
            Bone: false,
            Btwo: false,
            Bthree: false,
            Cone: false,
            Ctwo: false,
            Cthree: false,
            AoneColor: 'white',
            AtwoColor: 'white',
            AthreeColor: 'white',
            BoneColor: 'white',
            BtwoColor: 'white',
            BthreeColor: 'white',
            ConeColor: 'white',
            CtwoColor: 'white',
            CthreeColor: 'white',
            password: '',
            lines: [],
            username: ''
        }
    }
    componentDidMount(){
        console.log('hi')
    }
    handleLines() {
        const { lines } = this.state
        var mappedLines = lines.map(i => {


            return (
                <div key={i}>
                    <LineTo borderColor="blue" borderWidth={3} className="lines" from={i} to={lines[lines.indexOf(i) + 1] || i} />
                </div>
            )

        })
        return mappedLines

    }
    handleToggle(prop, val, color, selector) {
        if (val === true) {
            this.setState({
                [prop]: val,
                [color]: 'green'
            })
            this.state.lines.push(selector)
        } else {
            let filtered = this.state.lines.filter(value => {
                return value !== selector
            })
            this.setState({
                [prop]: val,
                [color]: 'white',
                lines: filtered
            })

        }
    }
    handlePassword  = async () => {
        const { Aone, Atwo, Athree, Bone, Btwo, Bthree, Cone, Ctwo, Cthree } = this.state
        let passwordGen = `${Aone}${Atwo}${Athree}${Bone}${Btwo}${Bthree}${Cone}${Ctwo}${Cthree}`
        let user = {
            username: this.state.username,
            password: passwordGen
        }
        await axios.post('/auth/register', user).then(res => {
            this.props.history.push('/profile')
        })
    }
    handleUsername(val){
        this.setState({
            username: val
        })
    }
    handleLogin = async () => {
        const { Aone, Atwo, Athree, Bone, Btwo, Bthree, Cone, Ctwo, Cthree } = this.state
        let passwordGen = `${Aone}${Atwo}${Athree}${Bone}${Btwo}${Bthree}${Cone}${Ctwo}${Cthree}`
        let user = {
            username: this.state.username,
            password: passwordGen
        }
        await axios.post('/auth/login', user).then(res => {
            this.props.history.push('/profile')
        }).catch(err => {
            alert('Incorrect Password')
        })
    }
    render() {
        console.log('mp', this.state.username)
        const { Aone, Atwo, Athree, Bone, Btwo, Bthree, Cone, Ctwo, Cthree,
            AoneColor, AtwoColor, AthreeColor, BoneColor, BtwoColor, BthreeColor, ConeColor, CtwoColor, CthreeColor } = this.state
        return (
            <div>
                {this.handleLines()}
                <div style={{marginTop: 40}}>
                <h1> Enter a username and select a pattern as your password </h1>
                <input value={this.state.username} placeholder="username" onChange={(e) => {this.handleUsername(e.target.value)}}></input>
                </div>
                <div className="passcontainer">
                    <div className="aonediv" onClick={() => { this.handleToggle('Aone', !Aone, 'AoneColor', "aonediv") }} style={{ background: AoneColor }} id="pattern"></div>
                    <div className="atwodiv" onClick={() => { this.handleToggle('Atwo', !Atwo, 'AtwoColor', "atwodiv") }} style={{ background: AtwoColor }} id="pattern"></div>
                    <div className="athreediv" onClick={() => { this.handleToggle('Athree', !Athree, 'AthreeColor', 'athreediv') }} style={{ background: AthreeColor }} id="pattern"></div>
                    <div className="bonediv" onClick={() => { this.handleToggle('Bone', !Bone, 'BoneColor', "bonediv") }} style={{ background: BoneColor }} id="pattern"></div>
                    <div className="btwodiv" onClick={() => { this.handleToggle('Btwo', !Btwo, 'BtwoColor', "btwodiv") }} style={{ background: BtwoColor }} id="pattern"></div>
                    <div className="bthreediv" onClick={() => { this.handleToggle('Bthree', !Bthree, 'BthreeColor', "bthreediv") }} style={{ background: BthreeColor }} id="pattern"></div>
                    <div className="conediv" onClick={() => { this.handleToggle('Cone', !Cone, 'ConeColor', "conediv") }} style={{ background: ConeColor }} id="pattern"></div>
                    <div className='ctwodiv' onClick={() => { this.handleToggle('Ctwo', !Ctwo, 'CtwoColor', "ctwodiv") }} style={{ background: CtwoColor }} id="pattern"></div>
                    <div className="cthreediv" onClick={() => { this.handleToggle('Cthree', !Cthree, 'CthreeColor', "cthreediv") }} style={{ background: CthreeColor }} id="pattern"></div>
                    <button onClick={ () => { this.handleLogin() }}>Login</button>
                    <button onClick={() => { this.handlePassword() }}>Create Account</button>
                </div>

            </div>
        )
    }
}

export default NineAuth