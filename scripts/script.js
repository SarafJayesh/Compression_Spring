//Input variables
var load;
var deflection;
var index;
var factor;

//Private variables
var yieldStress; //working stress in N/mm2
var rigidity;    //rigidity in N/mm2
var springEnd;

//Output variables
var wireDiameter;
var meanDiameter;
var wireLength;
var turns;
var pitch;
var stiffness;
//......................................................//
$(window).on('load', function(){
  $('#loader').fadeOut('fast');
})

$(document).ready(function() {
  $('#intro_text').hide().fadeIn(2000);
  //Show input form
  $('.card_content').hide();
  $('#input').show();

  $("form").submit(function(){

    //Set variables
    load = $('#load').val();
    deflection = $('#deflection').val();
    index = $('#index').val();
    factor =$('#factor').val();

    //Find Specifications
    setAssumptions();
    calculateOutput();
    generateOutput();
    //Show output
    $('#input').hide();
    $('#output').show();
  });
})
//......................................................//

//Public functions
function calculateOutput() {
  findDiameter();
  findTurns();
  findLength();
  findPitch();
  findStiffness();
}

function setAssumptions() {
  //Chrome Vanadium Steel
  yieldStress = (690/factor);
  rigidity = 79340;
  springEnd = 2; //Squared and Ground End
}


//Private Functions

function findDiameter() {
var wahlStressFactor = (4*index-1)/(4*index-4) + (0.615/index);
wireDiameter = Math.ceil(Math.sqrt((8*load*wahlStressFactor*index)/3.14));
meanDiameter = Math.ceil(wireDiameter*index);
}

function findTurns() {
  turns = Math.ceil((deflection*rigidity*(Math.pow(wireDiameter,4)))/(8*load*(Math.pow(meanDiameter,3))));
}

function findLength() {
  wireLength = Math.ceil((turns+springEnd)*wireDiameter+deflection*1.25);
}

function findPitch() {
  pitch = Math.ceil((wireLength-2*wireDiameter)/turns);
}

function findStiffness() {
  stiffness = load/deflection;
}

function generateOutput() {
  $('li:nth-child(1)').append(wireDiameter);
  $('li:nth-child(2)').append(meanDiameter);
  $('li:nth-child(3)').append(turns);
  $('li:nth-child(4)').append(wireLength);
  $('li:nth-child(5)').append(pitch);
  $('li:nth-child(6)').append(stiffness);
}
//Private functions
