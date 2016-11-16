//Input variables
var load;
var deflection;
var index;
var factor;
var maxShearStress; //working stress in N/mm2
var rigidity;

//Private variables
//working stress in N/mm2
var workingShearStress;    //rigidity in N/mm2
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
  $('#loader').hide();
  $('body').show();
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
    maxShearStress=$('#stress').val();
    rigidity=$('#rigidity').val()*1000;

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
  workingShearStress = (maxShearStress/factor);
  springEnd = 2; //Squared and Ground End
}


//Private Functions

function findDiameter() {
var wahlStressFactor = ((4*index-1)/(4*index-4)) + (0.615/index);
wireDiameter = (Math.sqrt((8*load*wahlStressFactor*index)/(3.14*workingShearStress))).toFixed(2);
meanDiameter = (wireDiameter*index).toFixed(2);
}

function findTurns() {
  turns = Math.ceil((deflection*rigidity*wireDiameter)/(8*load*index*index*index)+2);

}

function findLength() {
  wireLength =((turns)*wireDiameter+deflection*1.15).toFixed(2);
}

function findPitch() {
  pitch = ((wireLength/(turns-1)).toFixed(2));
}

function findStiffness() {
  stiffness = (load/deflection).toFixed(2);
}

function generateOutput() {
  $('#wireDiameter').append(wireDiameter+" mm");
  $('#meanDiameter').append(meanDiameter+" mm");
  $('#turns').append(turns);
  $('#wireLength').append(wireLength+" mm");
  $('#pitch').append(pitch);
  $('#stiffness').append(stiffness);
}
//Private functions
