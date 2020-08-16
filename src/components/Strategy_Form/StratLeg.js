import React, { useEffect } from 'react';
import './StratLeg.css';
import { Col } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import allActions from '../../redux/actions'

function StratLeg(props) {
    const thisLeg = useSelector((state) => state.currentStrategies[props.id].legs == null ? null : state.currentStrategies[props.id].legs[props.index])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "direction", props.direction))
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "type", props.type))
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "strike", 0.00))
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "premium", 0.00))
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "quantity", 0))
    }, [dispatch, props.id, props.index, props.direction, props.type, props.newStrat]);

    function handleDirectionChange(event) {
        const newDir = (event.target.value === '+') ? '+' : '-'
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "direction", newDir))            
    }

    function handleTypeChange(event) {
        const newType = (event.target.value === 'P') ? 'P' : 'C'
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "type", newType))            
    }

    function handleStrikeChange(event) {
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "strike", event.target.value))
    }

    function handlePremiumChange(event) {
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "premium", event.target.value))
    }

    function handleQuantityChange(event) {
        dispatch(allActions.updateStrategies.updateLeg(props.id, props.index, "quantity", event.target.value))
    }

    return (
    <div className="StratLeg-div"> 
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlID="legDirection">
                    <Form.Check type="radio" name="dir" label="Long" value='+'
                        checked={thisLeg == null ? props.direction ==='+' : thisLeg["direction"] ==='+'}
                        disabled={props.direction !=='+' && !props.custom} onChange={handleDirectionChange}/>
                    <Form.Check type="radio" name="dir" label="Short" value='-'
                        checked={thisLeg == null ? props.direction ==='-' : thisLeg["direction"] ==='-'}
                        disabled={props.direction !=='-' && !props.custom} onChange={handleDirectionChange}/>    
                </Form.Group>
                <Form.Group as={Col} controlID="legType">
                    <Form.Check type="radio" name="pc" label="Put" value='P'
                        checked={thisLeg == null ? props.type === 'P' : thisLeg["type"] ==='P'}
                        disabled={props.type !=='P' && !props.custom} onChange={handleTypeChange}/>
                    <Form.Check type="radio" name="pc" label="Call" value='C'
                        checked={thisLeg == null ? props.type === 'C' : thisLeg["type"] ==='C'}
                        disabled={props.type !=='C' && !props.custom} onChange={handleTypeChange}/>    
                </Form.Group>
                <Form.Group as={Col} controlID="legStrike">
                    <Form.Label>Strike</Form.Label>
                    <Form.Control value={thisLeg == null ? 0.00 : thisLeg["strike"]} onChange={handleStrikeChange}/>  
                </Form.Group>
                <Form.Group as={Col} controlID="legPremium">
                    <Form.Label>Premium</Form.Label>
                    <Form.Control value={thisLeg == null ? 0.00 : thisLeg["premium"]} onChange={handlePremiumChange}/>
                </Form.Group>
                <Form.Group as={Col} controlID="legQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control value={thisLeg == null ? 0.00 : thisLeg["quantity"]} onChange={handleQuantityChange}/>
                </Form.Group>
            </Form.Row>
        </Form>
    </div>
    );
}

export default StratLeg; 