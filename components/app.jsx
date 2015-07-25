var Preiskalkulator = React.createClass({
	getInitialState: function() {
		return {
			preisTotal: 0
		}
	},
	addTotal: function(preis) {
		this.setState({
			preisTotal: this.state.preisTotal + preis
		});
	},
	render: function() {
		var self = this;
		var getLeistungen = this.props.leistungen.map(function(l){
			return <Leistung key={l.name} name={l.name} preis={l.preis} active={l.active} addTotal={self.addTotal} sperren={l.sperren} serum={l.serum} exo={l.exo} />
		});
		return (
		<div className="preiskalkulator-wrapper">
			{getLeistungen}
			<hr />
			<div className="preis-total">Total: {this.state.preisTotal} EUR</div>
		</div>
		)
	}

});
var def = false;
var showExo = true;
var Leistung = React.createClass({
	getInitialState: function() {
		return {
			active: false,
			def: false,
			showExo: true
		}
	},
	ClickHandler: function(e) {
		var active = !this.state.active;
		if(this.props.exo) {
			if (showExo) {
				console.log("PLSSSS");
				this.setState({
					active: false
				});
				this.props.addTotal(-this.props.preis);
				return;
			}
		}
		if(this.props.serum) {
			showExo = (!active) ? true : false;
			this.setState({
				showExo: active
			});
		}
		if(this.props.sperren) {
			if(def && !active) {
				def=false;
				this.setState({
					active: active
				});
				this.props.addTotal(active? this.props.preis:-this.props.preis);
			} 
			if(def && active) {
				alert("Du brauchst nur eine der beiden Defektkorrekturen auswählen");
			}
			if(!def && active) {
				def=true;
				this.setState({
					active: active
				});
				this.props.addTotal(active? this.props.preis:-this.props.preis);
			}
		} else {
			this.setState({
				active: active
			});
			this.props.addTotal(active? this.props.preis:-this.props.preis);
		}
	},
	render: function() {
		if(this.props.sperren && !this.state.active && def) {
			return(<span></span>);
		} else {
			var showExoHelper = "";
			if(this.props.exo && showExo) {
				showExoHelper += " hideExo";
			}
			return(
				<div className={this.state.active ? 'active preis' + showExoHelper : 'preis' + showExoHelper}
				 onClick={this.ClickHandler}>
					{this.props.name}
					<strong>{this.props.preis} EUR</strong>
				</div>
			);
		}
	}
});

var preise = [
	{name: "Polieren I (wenig Kratzer)", preis: 280, sperren: true},
	{name: "Polieren II (viele Kratzer)", preis: 400, sperren: true},
	{name: "Innenraum inkl. Lederpflege", preis: 140},
	{name: "Motorraum", preis: 60},
	{name: "Scheibenversiegelung", preis: 40},
	{name: "Felgenversiegelung", preis: 80},
	{name: "Gtechniq Crystal Serum", preis: 180, serum: true},
	{name: "+ Gtechniq Exo Topping", preis: 40, exo: true}
];
React.render(
	<Preiskalkulator leistungen={preise} />,
	document.querySelector("#preiskalkulator")
);