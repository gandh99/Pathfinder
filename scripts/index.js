import Grid from "./grid.js";
import UtilityBar from "./utilitybar.js";
import AnimationButtonGroup from "./buttongroup/animationbuttongroup.js";
import HeaderBar from "./headerbar.js";

// Data for creating the grid
let numberOfRows = 20;
let numberOfCols = 50;
export let grid = new Grid(numberOfRows, numberOfCols);

// Load utility bar
let utilityBar = new UtilityBar();

// Load header bar
let headerBar = new HeaderBar(grid, utilityBar);