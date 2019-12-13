import * as React from "react";
import './Form.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            httpsEnabled: false,
            httpsPort: '',
            keyStoreFile: '',
            keyStorePass: '',
            redirectEnabled: false,
            httpEnabled: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        fetch("https://ЗДЕСЬ БУДЕТ ТВОЙ УРЛ ДЛЯ ГЕТ") //TODO: url
            .then(                                  // TODO: Здесь надо превратить результат фетча в значения для полей оно может быть в result.data или типа того
                (result) => {
                    this.setState({
                        httpsEnabled: result.data.httpsEnabled,
                        httpsPort: result.data.httpsPort,
                        keyStoreFile: result.data.keyStoreFile,
                        keyStorePass: result.data.keyStorePass,
                        redirectEnabled: result.data.redirectEnabled,
                        httpEnabled: result.data.httpEnabled,
                        ok: false
                    });
                }
            )
    }

    handleChange(event) {
        console.log(event.target.files);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.type === 'file' ? target.files[0] : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert(JSON.stringify(this.state));    //TODO: убрать, выводит состояние полей на send
        event.preventDefault();

        const formData = new FormData();

        formData.append('httpsEnabled', this.state.httpsEnabled);
        formData.append('httpsPort', this.state.httpsPort);
        formData.append('keyStoreFile', this.state.keyStoreFile);
        formData.append('keyStorePass', this.state.keyStorePass);
        formData.append('redirectEnabled', this.state.redirectEnabled);
        formData.append('httpEnabled', this.state.httpEnabled);

        fetch('https:Пост урл', {    //TODO: post url
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: formData
        }).then(result => {
                //тут чекаем респонз и если всё збс, то:
                this.setState({
                    ok: true
                });
            })
    }

    reset() {
        fetch('https:Ресет урл')    //TODO: Reset Url
            .then(() => {
                 // тут что-то происходит на ресет
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <div className="form__line">
                    <span>HTTPS enabled</span>
                    <label>
                        <input name="httpsEnabled" type="checkbox" checked={this.state.httpsEnabled}
                               onChange={this.handleChange}/>
                    </label>
                </div>
                <div className="form__line">

                    <span>HTTPS port</span>
                    <label>
                        <input name={'httpsPort'} type="text" value={this.state.httpsPort}
                               onChange={this.handleChange}/>
                    </label>
                </div>
                <div className="form__line">

                    <span>Key Store File</span>
                    <label>
                        <input name="keyStoreFile" type="file" value={this.state.keyStoreFile}
                               onChange={this.handleChange}/>
                    </label>
                </div>
                <div className="form__line">
                    <span>Key Store Password</span>
                    <label>
                        <input className="password" name="keyStorePass" type="password" value={this.state.keyStorePass}
                               onChange={this.handleChange}/>
                    </label>
                </div>
                <div className="form__line">
                    <span>Redirect enabled</span>
                    <label>
                        <input name="redirectEnabled" type="checkbox" checked={this.state.redirectEnabled}
                               onChange={this.handleChange}/>
                    </label>
                </div>
                <div className="form__line">
                    <span>HTTP enabled</span>
                    <label>
                        <input name="httpEnabled" type="checkbox" checked={this.state.httpEnabled}
                               onChange={this.handleChange}/>
                    </label>
                </div>

                <div className="form__line">
                    <input type="submit" value="Send"/>
                    <input type="button" value="Reset" onClick={this.reset}/>
                </div>
            </form>
        );
    }
}

export default Form;