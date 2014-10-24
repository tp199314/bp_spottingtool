$(document).ready(function() {
  
  // initialization of used variables
  var cdist, cangle, edist, eangle, beta, dist, alpha, angle, gamma, carddir, side;
  
  $( "#tool" ).submit(function( event ) {

    cdist = parseInt($( "#chasDistance" ).val());
    cangle = parseInt($( "#chasAngle" ).val());
    edist = parseInt($( "#enemyDistance" ).val());
    eangle = parseInt($( "#enemyAngle" ).val());
    
    // calculate beta
    if(Math.max(cangle,eangle)-Math.min(cangle,eangle)<=180){
      beta = Math.max(cangle,eangle)-Math.min(cangle,eangle);
    }
    else {
      beta = 360-Math.max(cangle,eangle)+Math.min(cangle,eangle);
    }
    
    // degree to radiant radiant = grad * Math.PI / 180
    // radiant to degree grad = radiant * 180 / Math.PI
    
    // calculate alpha
    alpha = (Math.acos((cdist*cdist-dist*dist-edist*edist)/(-2*dist*edist)))*180/Math.PI;
    
    // calculate gamma
    gamma = (Math.acos((edist*edist-cdist*cdist-dist*dist)/(-2*cdist*dist)))*180/Math.PI;
    
    // calculate enemyside
    // 0 = left, 1 = right
    if(cangle>0 && cangle <180){
      if(eangle>cangle && eangle<cangle+180){
        side = 1;
      }
      else{
        side = 0;
      }
    }
    else{
      if(eangle<cangle && eangle>cangle-180){
        side = 0;
      }
      else{
        side = 1;
      }
    }
    
    // Enemy is on the left side B11
    if (side == 0){
      if(cangle>180){
        angle = cangle-180+gamma; // or alpha...
      }
      else{
        angle = cangle+180+gamma; // or alpha...
      }
      dist = Math.sqrt(cdist*cdist+edist*edist-2*cdist*edist*Math.cos(beta*Math.PI/180));
    }
    // Enemy is on the right side F11
    else {
      if(cangle>180){
        angle = cangle-180-alpha;
      }
      else {
        angle = cangle+180-alpha;
      }
      dist = Math.sqrt(cdist*cdist+edist*edist-2*cdist*edist*Math.cos(beta*Math.PI/180));
    }
    
    // calculate distance from mate to enemy
    
    
    // when enemy and mate are in a line
    if((cangle+eangle)==180){
      angle = 180;
    }
    
    // fix for angle >= 360
    while(angle>=360){
      angle = angle-360;
    }
    
    // fix for angle < 0
    while(angle<0){
      angle = angle+360;
    }
    
    // same angle
    if(cangle==eangle){
      angle = cangle;
      if(edist<cdist){
        angle = cangle+180;
      }
    }
    
    // show cardinal direction
    if (parseInt(angle) > 0 && parseInt(angle) <= 22.9) { carddir = "N"; }
    else if (parseInt(angle) > 22.5 && parseInt(angle) <= 67.5) { carddir = "NE"; }
    else if (parseInt(angle) > 67.5 && parseInt(angle) <= 112.5) { carddir = "E"; }
    else if (parseInt(angle) > 112.5 && parseInt(angle) <= 157.5) { carddir = "SE"; }
    else if (parseInt(angle) > 157.5 && parseInt(angle) <= 202.5) { carddir = "S"; }
    else if (parseInt(angle) > 202.5 && parseInt(angle) <= 247.5) { carddir = "SW"; }
    else if (parseInt(angle) > 247.5 && parseInt(angle) <= 292.5) { carddir = "W"; }
    else if (parseInt(angle) > 292.5 && parseInt(angle) <= 337.5) { carddir = "NW"; }
    else if (parseInt(angle) > 337.5 && parseInt(angle) <= 360) { carddir = "N"; }
    else {carddir = "Are you kiddin me?!"}
          
    // debug - NOT left or right side specific
    // $( "div#result" ).replaceWith( "<div class='col-md-12' id='result' style='height: 20px;'><span class='glyphicon glyphicon-hand-right'></span> <strong style='color:green'>Result:</strong> cdist=" + cdist + ", cangle=" + cangle + ", edist=" + edist + ", eangle=" + eangle + ", beta=" + beta + ", DIST=" + dist + ", alpha=" + alpha + ", ANGLE=" + angle + ", gamma=" + gamma + ", carddir=" + carddir + ", side=" + side + "</div>" );
    
    // final output
    if((cangle==eangle) && (cdist==edist)) {
      $( "div#result" ).replaceWith( "<div class='col-md-12' id='result' style='height: 20px;'><span class='glyphicon glyphicon-hand-right'></span> <strong style='color:red'>Holy crap! Your buddy is in close combat!</div>" );
    }
    else {
      $( "div#result" ).replaceWith( "<div class='col-md-12' id='result' style='height: 20px;'><span class='glyphicon glyphicon-hand-right'></span> <strong style='color:green'>Result:</strong> Cardinal Direction: " + carddir + " Angle: " + Math.round(angle) + " Distance: " + Math.round(dist) + "</div>" );
    }
    event.preventDefault();
  });
  $( "form" ).on( "reset" ,function(){
    $( "div#result" ).replaceWith( "<div class='col-md-12' id='result' style='height: 20px;'></div>" );
  });
});
