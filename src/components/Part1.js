import React, { Component } from 'react'
import axios from 'axios'
import QRCode from "react-qr-code";
import moment from "moment";

export default class Part1 extends Component {

    state = {
        data: null
    }

    componentDidMount = async () => {
        try {
            let data = await axios.get("https://cors-anywhere.herokuapp.com/https://pickshare.herokuapp.com/users/challenge/getData")
            window.store.dispatch(window.saveData({ ...data.data }));

            this.setState({
                data: data.data
            })
        }
        catch (err) {
            console.warn(err)
        }

    }
    render() {
        const { data } = this.state
        let date = data && data.returnDate ? moment(data.returnDate).format("lll") : '';
        return (
            <div style={{ paddingBottom: 60 }}>
                {data ? (
                    <>

                        <div>
                            <b style={{ lineHeight: 0.3, fontSize: 13 }}>Depot</b>
                            <p style={{ lineHeight: 0.2, fontSize: 13 }}>{data.depotName}</p>
                            <p style={{ lineHeight: 0.2, fontSize: 13 }}>{data.depotAddress}</p>
                            <p style={{ lineHeight: 0.2, fontSize: 13 }}>{data.depotZip} {data.depotCity}</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                            <div style={{ padding: 5, boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.2)" }}>
                                <QRCode value={data._id} size={120} />
                            </div>
                            <div style={{ paddingLeft: 30 }}>
                                <div>
                                    <img src={data.senderLogo} style={{ height: 30 }} />
                                </div>

                                <b style={{ lineHeight: 0.1, fontSize: 13 }}>Sendungsnr.</b>
                                <p style={{ lineHeight: 0.1, fontSize: 12 }}>{data.propID}</p>
                                <b style={{ lineHeight: 0.1, fontSize: 13 }}>Restabholzeit</b>
                                <p style={{ lineHeight: 0.1, fontSize: 12 }}>{date}</p>
                            </div>
                        </div>


                    </>
                ) : <div>
                        Loading data..
                    </div>}

            </div>
        )
    }
}
