import React from 'react';
import Plotly from "plotly.js-basic-dist";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            running: false,
            method: "",
            newGroups: 0,
            tokenValue: 0,
            tokenWindow: 1,
            trendValue: 0,
            trendUnit: 'h',
            currency: '$',
            gas: 50,
            payout: 50,
            size: 0.1,
            days: 365,
            failedOffers: 0,
            lambdaWindow: 10,
            lambdaDerivative: 0,
            equilibrium: "No",
            lambdaChangeBoundary: 1,
            difficulty: 5,
            trends:{
                tokenValue:{
                    data: {
                        x: [],
                        y: [],
                        name: 'Token value'
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Token value',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                DCs:{
                    data: {
                        x: [],
                        y: [],
                        name: 'Number of DC nodes'
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Number of nodes',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                DHs:{
                    data: {
                        x: [],
                        y: [],
                        name: "Number of DH nodes"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Number of nodes',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                finalizedOffers:{
                    data: {
                        x: [],
                        y: [],
                        name: "Number of finalized offers"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Number of offers',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                totalOffers:{
                    data: {
                        x: [],
                        y: [],
                        name: "Total number of offers"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Token value',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                averageOfferPriceTRAC:{
                    data: {
                        x: [],
                        y: [],
                        name: "Average offer price in TRAC"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Offers price',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                averageOfferPriceCurrency:{
                    data: {
                        x: [],
                        y: [],
                        name: `Average offer price in the currency`
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Offers price',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                lambdaChangeDCs:{
                    data: {
                        x: [],
                        y: [],
                        name: "Average DC lambda"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Lambda',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                minLambdaChangeDCs:{
                    data: {
                        x: [],
                        y: [],
                        name: "Min DC lambda"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Token value',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                maxLambdaChangeDCs:{
                    data: {
                        x: [],
                        y: [],
                        name: "Max DC lambda"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Token value',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                lambdaChangeDHs:{
                    data: {
                        x: [],
                        y: [],
                        name: "Average DH lambda"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Token value',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                minLambdaChangeDHs:{
                    data: {
                        x: [],
                        y: [],
                        name: "Min DH lambda"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Token value',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                maxLambdaChangeDHs:{
                    data: {
                        x: [],
                        y: [],
                        name: "Max DH lambda"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Token value',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
                currentRiskRange:{
                    data: {
                        x: [],
                        y: [],
                        name: "Current risk range"
                    },
                    layout: {
                        datarevision: 0,
                        autosize: false,
                        width: 750,
                        title: {
                            text:'Risk range',
                            font: {
                                family: 'Courier New, monospace',
                                size: 24
                            },
                            xref: 'paper',
                            x: 0.05,
                        },
                    },
                },
            },
            revision: 0,
        }

        this.handleEvent = this.handleEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshTrends = this.refreshTrends.bind(this);
        this.clearTrends = this.clearTrends.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
        this.loadGlobalConfiguration = this.loadGlobalConfiguration.bind(this);
        this.DCGroup = this.DCGroup.bind(this);
        this.DHGroup = this.DHGroup.bind(this);
        this.changeControl = this.changeControl.bind(this);
    }

    componentDidMount() {
        this.loadGlobalConfiguration();
        if(this.state.running){
        this.state.interval = setInterval(this.refreshTrends, 100);
        }else{
            clearInterval(this.state.interval);
        }
        this.loadGroups();
    }
    clearTrends = () => {
        Object.keys(this.state.trends).forEach((key) => {
            this.state.trends[key].data.x = [];
            this.state.trends[key].data.y = [];
        });

        this.state.trendValue = 0;
        this.state.failedOffers = 0;
    };

    refreshTrends = () => {
        fetch(`http://localhost:3001/results`)
            .then(res => res.json())
            .then(
                (results) => {
                    if (!this.state.running)
                        return;

                    let x = new Array(results.tokenValue.length);
                    for(let i = 0; i < x.length; i+=1){
                        x[i] = this.state.trendValue+i;
                    }
                    this.state.trendValue += results.tokenValue.length;
                    Object.keys(results).forEach((key) => {
                        this.state.trends[key].data.y = this.state.trends[key].data.y.concat(results[key]);
                        this.state.trends[key].data.x = this.state.trends[key].data.x.concat(x);

                        if (this.state.trends[key].data.x.length>10000) {
                            this.state.trends[key].data.x.splice(0, this.state.trends[key].data.x.length - 10000);
                            this.state.trends[key].data.y.splice(0, this.state.trends[key].data.y.length - 10000);
                        }

                        this.state.trends[key].layout.datarevision = this.state.revision + 1;
                        this.state.trends[key].layout.datarevision = this.state.revision + 1;
                    });
                    this.setState({ failedOffers:
                            this.state.trends.totalOffers.data.y.reduce((a, b) => a + b, 0)
                            - this.state.trends.finalizedOffers.data.y.reduce((a, b) => a + b, 0)});

                    let i = 0;
                    if (this.state.trends.lambdaChangeDCs.data.y.length <= this.state.lambdaWindow){
                        i = 0;
                    }else{
                        i = this.state.trends.lambdaChangeDCs.data.y.length - this.state.lambdaWindow;
                    }

                    let equilibrium = true;
                    let changeSum = 0;
                    for (; i < this.state.trends.lambdaChangeDCs.data.y.length-1; i+=1){
                        changeSum += this.state.trends.lambdaChangeDCs.data.y[i]-this.state.trends.lambdaChangeDCs.data.y[i+1];
                    }


                    if (Math.abs(changeSum)>this.state.lambdaChangeBoundary){
                        equilibrium= false;
                    }

                    this.setState({ lambdaDerivative: changeSum.toFixed(2) });
                    this.setState({ equilibrium: equilibrium? "Yes": "No" });
                    this.setState({ revision: this.state.revision + 1 });
                },
                (error) => {
                    // console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    loadGroups = () => {
        this.setState({groups: []});
        fetch(`http://localhost:3001/groups`)
            .then(res => res.json())
            .then(
                (results) => {
                    for (let i = 0; i < results.data.nodeGroups.length; i+=1){
                        const group = results.data.nodeGroups[i];
                        if (group.type === 'DC')
                            this.setState({
                                groups: [...this.state.groups, this.DCGroup(i+1, group.id, group.name, group.number, group.type, group.lambda, group.maxLambda, group.alpha, group.riskRange,group.offersProbability)]
                            })
                        else
                            this.setState({
                                groups: [...this.state.groups, this.DHGroup(i+1, group.id, group.name, group.number, group.type, group.lambda, group.minLambda, group.refreshRate, group.epsilon)]
                            })
                    }

                    this.state.newGroups = 0;
                },
                (error) => {
                    // console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    loadGlobalConfiguration = () => {
        fetch(`http://localhost:3001/groups`)
            .then(res => res.json())
            .then(
                (results) => {
                    this.setState({
                        tokenValue: results.data.tokenValue,
                        tokenWindow: results.data.tokenWindow
                    });
                },
                (error) => {
                    // console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    DCGroup = (i, id, name, number, type, lambda, maxLambda, alpha, riskRange, offersProbability) => {
        return <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                    {name}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={i}>
                <Card.Body >
                    <Form name='network-configuration' style={{"border-radius":"5px", background: "#f7f7f7", padding: "10px 20px", margin:"5px 0"}} onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Control name="id" defaultValue={id} hidden/>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Name</Form.Label>
                                <Form.Control name="groupName" defaultValue={name}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Nodes</Form.Label>
                                <Form.Control name="number" defaultValue={number}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Type</Form.Label>
                                <Form.Control name="type" defaultValue={type} readonly/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Lambda mean</Form.Label>
                                <Form.Control name="lambda_mean"  defaultValue={lambda.mean}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="lambda_variance"  defaultValue={lambda.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="lambda_distribution" as="select" defaultValue={lambda.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Max. L. mean</Form.Label>
                                <Form.Control name="maxLambda_mean" defaultValue={maxLambda.mean}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="maxLambda_variance" defaultValue={maxLambda.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="maxLambda_distribution" as="select" defaultValue={maxLambda.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Alpha mean</Form.Label>
                                <Form.Control name="alpha_mean" defaultValue={alpha.mean}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="alpha_variance" defaultValue={alpha.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="alpha_distribution" as="select" defaultValue={alpha.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>R. range mean</Form.Label>
                                <Form.Control name="riskRange_mean" defaultValue={riskRange.mean}/>
                            </Form.Group>
                            <Form.Group  as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="riskRange_variance" defaultValue={riskRange.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="riskRange_distribution" as="select" defaultValue={riskRange.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Offers number</Form.Label>
                                <Form.Control name="offersProbability_mean" defaultValue={offersProbability.mean}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="offersProbability_variance" defaultValue={offersProbability.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="offersProbability_distribution" as="select" defaultValue={offersProbability.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <button as={Col} type="submit" className="btn btn-block btn-primary" onClick={() => this.setState({method: "post"})}>Save</button>
                            <button as={Col} type="submit" className="btn btn-block btn-danger" onClick={() => this.setState({method: "delete"})}>Delete</button>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    }
    DHGroup = (i, id, name, number, type, lambda, minLambda, refreshRate, epsilon) => {
        return <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                    {name}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={i}>
                <Card.Body>
                    <Form name='network-configuration' style={{"border-radius":"5px", background: "#f7f7f7", padding: "10px 20px", margin:"5px 0"}} onSubmit={this.handleSubmit}>
                        <Form.Control name="id" defaultValue={id} hidden/>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Name</Form.Label>
                                <Form.Control name="groupName" defaultValue={name}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Nodes</Form.Label>
                                <Form.Control name="number" defaultValue={number}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Type</Form.Label>
                                <Form.Control name="type" defaultValue={type} readonly/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Lambda mean</Form.Label>
                                <Form.Control name="lambda_mean" defaultValue={lambda.mean}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="lambda_variance" defaultValue={lambda.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="lambda_distribution" as="select" defaultValue={lambda.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Min. L. mean</Form.Label>
                                <Form.Control name="minLambda_mean" defaultValue={minLambda.mean}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="minLambda_variance" defaultValue={minLambda.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="minLambda_distribution" as="select" defaultValue={minLambda.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>R. rate mean</Form.Label>
                                <Form.Control name="refreshRate_mean" defaultValue={refreshRate.mean}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="refreshRate_variance" defaultValue={refreshRate.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="refreshRate_distribution" as="select" defaultValue={refreshRate.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Epsilon mean</Form.Label>
                                <Form.Control name="epsilon_mean" defaultValue={epsilon.mean}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Variance</Form.Label>
                                <Form.Control name="epsilon_variance" defaultValue={epsilon.variance}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Dist</Form.Label>
                                <Form.Control name="epsilon_distribution" as="select" defaultValue={epsilon.distribution}>
                                    <option>uniform</option>
                                    <option>random</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <button as={Col} type="submit" className="btn btn-block btn-primary" onClick={() => this.setState({method: "post"})}>Save</button>
                            <button as={Col} type="submit" className="btn btn-block btn-danger" onClick={() => this.setState({method: "delete"})}>Delete</button>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        let endpoint, body = {};

        if (event.target.name === 'global-configuration'){
            endpoint = 'configuration/global';
            body = {
                tokenValue: parseFloat(formDataObj.tokenValue),
                tokenWindow: parseInt(formDataObj.tokenWindow, 10)
            };
        }else if (event.target.name === 'network-configuration'){
            if (this.state.method === 'delete'){
                endpoint = `configuration/network/${formDataObj.id}`;
            } else{
                endpoint = `configuration/network`;
                if (formDataObj.type === 'DC'){
                    body['id'] = formDataObj.id;
                    body['name'] = formDataObj.groupName;
                    body['number'] = parseInt(formDataObj.number, 10);
                    body['type'] = formDataObj.type;
                    for (let name of ['lambda', 'maxLambda', 'alpha', 'riskRange', 'offersProbability']){
                        body[name] = {mean: parseFloat(formDataObj[`${name}_mean`]),variance: parseFloat(formDataObj[`${name}_variance`]),distribution: formDataObj[`${name}_distribution`]};
                    }
                }else{
                    body['id'] = formDataObj.id;
                    body['name'] = formDataObj.groupName;
                    body['number'] = parseInt(formDataObj.number, 10);
                    body['type'] = formDataObj.type;
                    for (let name of ['lambda', 'minLambda', 'refreshRate', 'epsilon']){
                        body[name] = {mean: parseFloat(formDataObj[`${name}_mean`]),variance: parseFloat(formDataObj[`${name}_variance`]),distribution: formDataObj[`${name}_distribution`]};
                    }
                }
            }
        }

        fetch(`http://localhost:3001/${endpoint}`, {
            method: this.state.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(response => response.json())
        .then(data => {
            this.loadGroups();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    handleEvent(event){
        this.state.newGroups-=1;
        if (event.target.name === "add-new-dc-group") {
            const defaultDC = {
                "name": "Set name",
                "type": "DC",
                "number": 5,
                "lambda": {
                    "mean": 5,
                    "variance": 2,
                    "distribution": "random"
                },
                "alpha": {
                    "mean": 1,
                    "variance": 0,
                    "distribution": "random"
                },
                "riskRange": {
                    "mean": 60,
                    "variance": 20,
                    "distribution": "random"
                },
                "maxLambda": {
                    "mean": 10,
                    "variance": 0,
                    "distribution": "random"
                },
                "offersProbability": {
                    "mean": 5,
                    "variance": 0,
                    "distribution": "random"
                }
            };
            const group = defaultDC;
            this.setState({
                groups: [...this.state.groups, this.DCGroup(this.state.newGroups, uuidv4(), group.name, group.number, group.type, group.lambda, group.maxLambda, group.alpha, group.riskRange,group.offersProbability)]
            })
        }else if (event.target.name === "add-new-dh-group"){
            const defaultDH = {
                "name": "Set name",
                "type": "DH",
                "number": 100,
                "lambda": {
                    "mean": 3,
                    "variance": 1,
                    "distribution": "random"
                },
                "refreshRate": {
                    "mean": 50,
                    "variance": 10,
                    "distribution": "random"
                },
                "epsilon": {
                    "mean": 50,
                    "variance": 40,
                    "distribution": "random"
                },
                "minLambda": {
                    "mean": 1,
                    "variance": 0,
                    "distribution": "random"
                }
            };
            const group = defaultDH;
            this.setState({
                groups: [...this.state.groups, this.DHGroup(this.state.newGroups, uuidv4(), group.name, group.number, group.type, group.lambda, group.minLambda, group.refreshRate, group.epsilon)]
            })
        }else if (event.target.name === "start"){
            fetch(`http://localhost:3001/start`)
                .then(res => res.json())
                .then(
                    (results) => {
                        this.state.running = true;
                        this.componentDidMount();
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }else if (event.target.name === "stop"){
            fetch(`http://localhost:3001/stop`)
                .then(res => res.json())
                .then(
                    (results) => {
                        this.state.running = false;
                        this.componentDidMount();
                        this.clearTrends();
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }else if (event.target.name === "pause"){
            fetch(`http://localhost:3001/pause`)
                .then(res => res.json())
                .then(
                    (results) => {
                        this.state.running = false;
                        this.componentDidMount();
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }else if (event.target.name === "save"){
            Object.keys(this.state.trends).forEach((key) => {
                const div = document.getElementById(key);
                if (div){
                    Plotly.downloadImage(div, {format: 'png', filename: this.state.trends[key].layout.title.text})
                }
            });
            fetch(`http://localhost:3001/save`)
                .then(res => res.json())
                .then(
                    (results) => {
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    changeControl(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div style={{"text-align":"center"}}>
                <h1>Compensation mechanism simulator</h1>
                <div style={{float:"left", width:"20%", position:"relative", padding:"10px 5px 100px 5px", display:"block", "border-top":"1px solid #292b2c"}}>
                    <h4>Global configuration</h4>
                    <Form name="global-configuration" style={{"border-radius":"5px", background: "#f7f7f7", padding: "10px 20px", margin:"5px 0"}} onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Token v.</Form.Label>
                                <Form.Control type="text" name="tokenValue" value={this.state.tokenValue} onChange={this.changeControl}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Token w.</Form.Label>
                                <Form.Control type="text" name="tokenWindow" value={this.state.tokenWindow} onChange={this.changeControl}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Difficulty</Form.Label>
                                <Form.Control as="select" name="difficulty" value={this.state.difficulty} onChange={this.changeControl}>
                                    <option>6</option>
                                    <option>7</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>.</Form.Label>
                            <button type="submit" className="btn btn-block btn-primary" onClick={() => this.setState({method: "post"})}>Save</button>
                            </Form.Group>
                        </Form.Row>
                    </Form>



                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Gas</Form.Label>
                                <Form.Control type="text" name="gas" defaultValue="50" onChange={this.changeControl}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Payout</Form.Label>
                                <Form.Control type="text" name="payout" defaultValue="50" onChange={this.changeControl}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Size</Form.Label>
                                <Form.Control type="text" name="size" defaultValue="0.1" onChange={this.changeControl}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Days</Form.Label>
                                <Form.Control type="text" name="days" defaultValue="365" onChange={this.changeControl}/>
                            </Form.Group>
                        </Form.Row>
                    </Form>

                    <Form.Group as={Col}>
                        <Form.Label style={{"font-size":"12px"}}>Currency</Form.Label>
                        <Form.Control type="text" name="currency" defaultValue="$" onChange={this.changeControl}/>
                    </Form.Group>



                    <Form.Group as={Col}>
                        <Form.Label style={{"font-size":"12px"}}>Time unit</Form.Label>
                        <Form.Control name="trendUnit" as="select" defaultValue='h' onChange={this.changeControl}>
                            <option>min</option>
                            <option>h</option>
                            <option>day</option>
                        </Form.Control>
                    </Form.Group>


                    <Form style={{"border-radius":"5px", background: "#f7f7f7", padding: "10px 20px", margin:"5px 0"}}>
                        <Form.Row>

                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Lambda window for equilibrium</Form.Label>
                                <Form.Control type="text" name="lambdaWindow" value={this.state.lambdaWindow} onChange={this.changeControl}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label style={{"font-size":"12px"}}>Lambda change for equilibrium</Form.Label>
                                <Form.Control type="text" name="lambdaChangeBoundary" value={this.state.lambdaChangeBoundary} onChange={this.changeControl}/>
                            </Form.Group>

                        </Form.Row>
                    </Form>

                    <h4>Network configuration</h4>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="primary" name="add-new-dc-group" className="btn btn-block" onClick={this.handleEvent}>Add new DC group</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button variant="primary" name="add-new-dh-group" className="btn btn-block" onClick={this.handleEvent}>Add new DH group</Button>
                        </Form.Group>
                    </Form.Row>
                    <Accordion defaultActiveKey="0">
                        {this.state.groups}
                    </Accordion>
                </div>
                <div style={{float:"left", width:"20%", position:"fixed", left:"0", bottom:"0", background: "#f7f7f7", padding:"10px 5px"}}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="success" name="start" className="btn btn-block" onClick={this.handleEvent}>Start</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button variant="warning" name="pause" className="btn btn-block" onClick={this.handleEvent}>Pause</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button variant="danger" name="stop" className="btn btn-block" onClick={this.handleEvent}>Stop</Button>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button variant="link" name="save" className="btn btn-block" onClick={this.handleEvent}>Save</Button>
                        </Form.Group>
                    </Form.Row>
                </div>
                <div style={{float:"right", width:"80%",  display:"block", "border-left":"1px solid #292b2c", "border-top":"1px solid #292b2c"}}>
                    <h4>Time passed: {this.state.trendValue} {this.state.trendUnit} Currency: {this.state.currency}</h4>
                    <h4>Failed offers: {this.state.failedOffers} Equilibrium: {this.state.equilibrium} Lambda derivative: {this.state.lambdaDerivative}</h4>
                    <Plot
                        data={[
                            this.state.trends.averageOfferPriceTRAC.data,
                            this.state.trends.averageOfferPriceCurrency.data,
                        ]}
                        layout={this.state.trends.averageOfferPriceTRAC.layout}
                        revision={this.state.revision}
                        divId="averageOfferPriceTRAC"
                        style={{float:"left"}}
                    />

                    <Plot
                        data={[
                            this.state.trends.tokenValue.data
                        ]}
                        layout={this.state.trends.tokenValue.layout}
                        revision={this.state.revision}
                        divId="tokenValue"
                        style={{float:"left"}}
                    />

                    <Plot
                        data={[
                            this.state.trends.lambdaChangeDCs.data,
                            this.state.trends.minLambdaChangeDCs.data,
                            this.state.trends.maxLambdaChangeDCs.data,
                            this.state.trends.lambdaChangeDHs.data,
                            this.state.trends.minLambdaChangeDHs.data,
                            this.state.trends.maxLambdaChangeDHs.data,
                        ]}
                        layout={this.state.trends.lambdaChangeDCs.layout}
                        revision={this.state.revision}
                        divId="lambdaChangeDCs"
                        style={{float:"left"}}
                    />

                    <Plot
                        data={[
                            this.state.trends.finalizedOffers.data,
                            this.state.trends.totalOffers.data,
                        ]}
                        layout={this.state.trends.finalizedOffers.layout}
                        revision={this.state.revision}
                        divId="finalizedOffers"
                        style={{float:"left"}}
                    />


                    <Plot
                        data={[
                            this.state.trends.DCs.data,
                            this.state.trends.DHs.data,
                        ]}
                        layout={this.state.trends.DCs.layout}
                        revision={this.state.revision}
                        divId="DCs"
                        style={{float:"left"}}
                    />

                    <Plot
                        data={[
                            this.state.trends.currentRiskRange.data,
                        ]}
                        layout={this.state.trends.currentRiskRange.layout}
                        revision={this.state.revision}
                        divId="DCs"
                        style={{float:"left"}}
                    />


                </div>
            </div>);
    }
}

export default App;
