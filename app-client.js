import React from 'react';
import ReactDom from 'react-dom';

var Notes = require('./components/notes.js');

//var HELLO = React.createClass({
//    render(){
//        return (
//            <h1>Hello cruel World !!! </h1>
//        )
//    }
//});
//
//var APP = React.createClass({
//    render(){
//        return (
//            <div>
//                <h1> {this.props.text} </h1>
//                <HELLO>  </HELLO>
//                <p> {this.props.children} </p>
//            </div>
//        )
//    }
//})

var Board = React.createClass({

    propTypes : {
      count: function(props,propName){
            console.log('***');
          console.log(props);
          console.log(propName)
            if(typeof props[propName] !== "number"){
                return new Error('Must be a number !')
            }

            if(props[propName] > 100) {
                return new Error('No such number supported!');
            }
      }
    },

    getInitialState(){

        return {
            notes : []
        };

    },

    nextId(){
        this.uniqueIdKKK = this.uniqueIdKKK || 0;
        return this.uniqueIdKKK++;
    },

    componentWillMount(){
        console.log('yaha')
        var self = this;
        if(this.props.count){
            $.getJSON('/api/notes',function(res){
                if(res.success){
                    res.notes.forEach(function(note){
                        self.add(note.note);
                    })
                }
            })
        }
    },

    update(newText,i){

        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({notes:arr});

    },

    remove(i){
        var arr = this.state.notes;
        arr.splice(i,1);
        this.setState({notes:arr});
    },

    add(text){

        var arr = this.state.notes;
        arr.push({
            id : this.nextId(),
            note : text
        });
        this.setState({notes:arr});


    },

    eachNote(note,i){

        return (

            <Notes key={note.id} index={i} onChange={this.update} onRemove={this.remove} >{note.note}</Notes>

        );

    },

    render (){
        return(
            <div className="board">

                {this.state.notes.map(this.eachNote)}
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick={this.add.bind(null,"New Note")}></button>
            </div>
        );
    }

})


ReactDom.render(<Board count={10} />,document.getElementById('react-container'));
//ReactDom.render(<Notes> Hello World !</Notes>,document.getElementById('react-container'));