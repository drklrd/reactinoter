import React from 'react';
import ReactDOM from 'react-dom';
var Note = React.createClass({

    getInitialState(){
        return { editing : false }
    },

    componentWillMount(){

        this.style = {
            right : this.randomBetween(0,window.innerWidth - 150) + 'px',
            top : this.randomBetween(0,window.innerHeight - 150) + 'px',
            transform : 'rotate(' + this.randomBetween(-15,15) + 'deg)'
        }
    },

    componentDidMount(){
        $(ReactDOM.findDOMNode(this)).draggable();
    },

    randomBetween(min,max){

        return (min + Math.ceil(Math.random() * max));
    },

    edit(){
        this.setState({editing : true});
    },

    save(){

        this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value,this.props.index);
        this.setState({editing : false});
    },

    remove(){
        this.props.onRemove(this.props.index);
    },

    renderDisplay(){

        return (
            <div className="note" style={this.style}>
                <p> {this.props.children} </p>
                <span>
                    <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil">

                    </button>
                    <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash">

                    </button>

                </span>
            </div>
        )


    },

    renderForm(){

        return(

            <div className="note" style={this.style}>

                <textarea ref="newText" defaultValue={this.props.children} className="form-control">


                </textarea>
                <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"></button>

            </div>

        )

    },

    render(){
        if(this.state.editing){
            return this.renderForm();
        }else{
            return this.renderDisplay();
        }

    }
})
module.exports = Note;