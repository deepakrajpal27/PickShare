import React, { Component } from 'react'
import axios from 'axios'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default class Part2 extends Component {

    state = {
        err: "",
        updating: false,
        updated: false,
        dates: [],
        hours: [],
        selectedDate: new Date().toISOString(),
        selectedTime: ""
    }

    componentDidMount() {
        let today = new Date()

        const options = [
            { label: 'Heute', value: today.toISOString() }
        ];
        today.setDate(today.getDate() + 1)

        for (let i = 0; i < 6; i++) {
            options.push({ label: this.getDay(today.getDay()) + " " + today.getDate() + "." + today.getMonth() + ".", value: today.toISOString() })
            today.setDate(today.getDate() + 1)
        }
        this.setState({
            dates: options
        })

        if (today.getDay() === 0) {
            this.setState({ hours: [], selectedTime: "" })
        }
        else if (today.getDay() === 6) {
            this.setState({
                hours: ["16:00-18:00"], selectedDate: new Date().toISOString(), selectedTime: "16:00-18:00"
            })

        }
        else {
            this.setState({ hours: ["16:00-18:00", "18:00-20:00", "20:00-22:00"], selectedDate: new Date().toISOString(), selectedTime: "16:00-18:00" })

        }

    }


    getDay = (index) => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        return days[index]

    }

    _onSelect = (val) => {
        console.log(val.value)
        let date = new Date(val.value)
        let day = this.getDay(date.getDay())

        if (date.getDay() === 0) {
            this.setState({ hours: [], selectedDate: val.value, selectedTime: "" })
        }
        else if (date.getDay() === 6) {
            this.setState({ hours: ["16:00-18:00"], selectedDate: val.value, selectedTime: "16:00-18:00" })

        }
        else {
            this.setState({ hours: ["16:00-18:00", "18:00-20:00", "20:00-22:00"], selectedDate: val.value, selectedTime: "16:00-18:00" })

        }
    }

    _onSelectHours = (val) => {
        console.warn(val)
        this.setState({ selectedTime: val.value })
    }


    updateData = () => {
        this.setState({ err: "", updating: true, updated: false })
        const { selectedTime, selectedDate } = this.state;

        console.warn({
            date: new Date(selectedDate).toISOString(),
            start: selectedTime.split("-")[0],
            end: selectedTime.split("-")[1],
            _id: window.store.getState().data._id
        })

        axios.put("https://cors-anywhere.herokuapp.com/https://pickshare.herokuapp.com/users/challenge/sendData", {
            date: new Date(selectedDate).toISOString(),
            start: selectedTime.split("-")[0],
            end: selectedTime.split("-")[1],
            _id: window.store.getState().data._id
        })
            .then(() => {
                this.setState({ updating: false, updated: true })
            })
            .catch(err => {
                this.setState({ err: err.message, updated: false })
            })
    }

    render() {
        const { err, updating, updated, dates, hours } = this.state



        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100vw', backgroundColor: 'rgb(227,227,227)', padding: 10 }}>
                    <b style={{ lineHeight: 0.3, fontSize: 13 }}>Zustellung moglich!</b>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Dropdown options={dates} onChange={this._onSelect} value={dates[0]} />
                        <Dropdown options={hours} onChange={this._onSelectHours} value={hours[0]} placeholder="Select an option" />
                    </div>

                    <h1>0€</h1>
                    <button
                        onClick={this.updateData}
                        style={{ backgroundColor: 'rgb(167,199,69)', borderWidth: 0, padding: 10 }}>{updating ? "Loading" : "Verbindlich bestellen"}</button>

                    {err.length > 0 && (
                        <p style={{ lineHeight: 0.3, fontSize: 13, color: 'red' }}>Error:{err}</p>

                    )}

                    {updated && (
                        <p style={{ lineHeight: 0.3, fontSize: 13, color: 'rgb(167,199,69)' }}>Data entered successfully</p>

                    )}
                </div>

            </div>
        )
    }
}
