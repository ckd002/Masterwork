		function addNode()
			{
			var studentName=document.getElementById("student").value;
			var email=document.getElementById("email").value;
			var className=document.getElementById("class").value;
			var prof=document.getElementById("professor").value;
			var book=document.getElementById("book").value;
		
			$.ajax({
			type: "POST",
			url: "http://localhost:7474/db/data/node",
			accepts: "application/json",
			dataType: "json",
			data: {
				"Student": studentName,
				"Email": email,
				"Class": className,
				"Professor": prof,
				"Book": book
				},
			success: function(data, textStatus, jqXHR)
					{
					document.getElementById('makechanges').innerHTML = "Book Successfully Added";
					document.getElementById('addForm').reset();
					document.getElementById('displaybooks').innerHTML="";
					},
			error:function(jqXHR, textStatus, errorThrown)
					{
					document.getElementById('makechanges').innerHTML = "Error Status: " + 
					req.status + "<br />Error Description: " + req.statusText;
					}
			});
			
			}
			
		function delNode(url)
			{ 
			var data;
			
			$.ajax({
			type: "DELETE",
			url: url,
			success: function(data, textStatus, jqXHR)
					{
					document.getElementById('displaybooks').innerHTML =  "Book Successfully Deleted";
					document.getElementById('makechanges').innerHTML="";
					},
			error:function(jqXHR, textStatus, errorThrown)
					{
					document.getElementById('displaybooks').innerHTML = "Error Status: " + 
					req.status + "<br />Error Description: " + textStatus;
					}
			
			});//end ajax
			
			}
			
		function queryGraph(query)
			{
			var book=document.getElementById('booktofind').value;
			
			if (book=="")
				document.getElementById('displaybooks').innerHTML= "Please enter the book title you wish to search";
			else
				{
				$.ajax({
					type:"POST",
					url: "http://localhost:7474/db/data/cypher",
					accepts: "application/json",
					dataType:"json",
					data:{
						"query" : "start n= node(*) where n.Book= '" + book + "' return n;",
						"params" : {}
					},
					success: function(data, textStatus, jqXHR)
						{
						displayResults(data);
						},
					error:function(jqXHR, textStatus, errorThrown){
					alert(textStatus);}
				});//end of placelist ajax
				}
 			
 			}
			
		function showNodes()
			{
			$.ajax({
				type:"POST",
				url: "http://localhost:7474/db/data/cypher",
				accepts: "application/json",
				dataType:"json",
				data:{
					"query" : "start root= node(*) return root;",
					"params" : {}
				},
				success: function(data, textStatus, jqXHR)
					{
					displayResults(data);
					
					},
				error:function(jqXHR, textStatus, errorThrown){
 				alert(textStatus);}
 			});//end of placelist ajax
			
			}
			
		function getbyname()
			{
			var sname=document.getElementById("findstudent").value;
			
			if (sname=="")
				document.getElementById('displaybooks').innerHTML= "Please enter your name to find your books";
			else
				{
				$.ajax({
					type:"POST",
					url: "http://localhost:7474/db/data/cypher",
					accepts: "application/json",
					dataType:"json",
					data:{
						"query" : "start n= node(*) where n.Student= '" + sname + "'return n;",
						"params" : {}
					},
					success: function(data, textStatus, jqXHR)
						{
						displayResults(data);
						
						},
					error:function(jqXHR, textStatus, errorThrown){
					alert(textStatus);}
				});//end of placelist ajax
				}
			
			}
			
		function displayResults(data)
			{
			var table = "<table border=1>";
			table+= "<tr><th>Name</th><th>Email</th><th>Professor</th><th>Class</th><th>Book</th></tr>"
			
			for (var i=0, len=data.data.length; i < len; i++)
				{
				table+= "<tr>";
				table+= "<td>" + data.data[i][0].data.Student + "</td>";
				table+= "<td>" + data.data[i][0].data.Email + "</td>";
				table+= "<td>" + data.data[i][0].data.Professor + "</td>";
				table+= "<td>" + data.data[i][0].data.Class + "</td>";
				table+= "<td>" + data.data[i][0].data.Book + "</td>";
				if (data.data[i][0].data.Student==document.getElementById("findstudent").value)
					table+= "<td><input type=\"button\" name=\"del\" value= \"Delete Book\" onclick=\"delNode(\'" + data.data[i][0].self + "\')\"/></td>";
				
				table+= "</tr>";

				}
			table += "</table>";
			
			document.getElementById('displaybooks').innerHTML= table;
			document.getElementById('makechanges').innerHTML="";
			document.getElementById('getByName').reset();
			document.getElementById('findBook').reset();
			}