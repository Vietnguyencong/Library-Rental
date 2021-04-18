
import { Form, FormControl, Button } from 'react-bootstrap'
import React from 'react' 
class Searchbar extends React.Component{
    state  = {
        term: ""
    }
    onchangeContent = (e)=>{
        this.setState ({term: e.target.value})
        this.props.submitSearchForm(this.state.term)
    }
    onSubmit   = e=>{
        e.preventDefault()
        this.props.submitSearchForm(this.state.term)
    }
    render(){
        return (
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" 
                    onChange={this.onchangeContent}
                />
                <Button variant="outline-light" type="submit" 
                    onSubmit={this.onSubmit}
                >Search</Button>
            </Form>
        )
    }
}
export default Searchbar