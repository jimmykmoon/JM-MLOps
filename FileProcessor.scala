import java.io.{File, FileWriter, PrintWriter}
import java.nio.file.{Files, Paths}
import scala.io.Source
import scala.util.{Try, Success, Failure}

object FileProcessor {
  def main(args: Array[String]): Unit = {
    // 1. Check command line arguments
    if (args.length == 0) {
      println("Usage: scala FileProcessor.scala <file_path>")
      println("Example: scala FileProcessor.scala debug.log")
      println("Example: scala FileProcessor.scala /path/to/debug.log")
      return
    }
    
    val fileName = args(0)
    
    // 1. Find the file
    println(s"Looking for file: $fileName")
    val file = new File(fileName)
    
    if (!file.exists()) {
      println(s"File $fileName not found. Creating a sample file...")
      createSampleFile(fileName)
    }
    
    // 2. Open and read the file
    println(s"\nReading file: $fileName")
    val content = readFile(fileName)
    
    // 3. Print the content
    println("Current file content:")
    println("-" * 50)
    content.foreach(println)
    println("-" * 50)
    
    // 4. Add new line in the middle
    println("\nAdding 'New line by Jimmy' in the middle of the file...")
    addLineInMiddle(fileName, content)
    
    // Read and print the updated content
    println("\nUpdated file content:")
    println("-" * 50)
    readFile(fileName).foreach(println)
    println("-" * 50)
  }
  
  def readFile(fileName: String): List[String] = {
    Try {
      Source.fromFile(fileName).getLines().toList
    } match {
      case Success(lines) => lines
      case Failure(exception) =>
        println(s"Error reading file: ${exception.getMessage}")
        List.empty
    }
  }
  
  def createSampleFile(fileName: String): Unit = {
    Try {
      // Create parent directories if they don't exist
      val file = new File(fileName)
      val parentDir = file.getParentFile
      if (parentDir != null && !parentDir.exists()) {
        parentDir.mkdirs()
      }
      
      val writer = new PrintWriter(new FileWriter(fileName))
      writer.println("First line of debug log")
      writer.println("Second line of debug log")
      writer.println("Third line of debug log")
      writer.println("Fourth line of debug log")
      writer.println("Fifth line of debug log")
      writer.close()
      println(s"Sample file $fileName created successfully.")
    } match {
      case Success(_) => ()
      case Failure(exception) =>
        println(s"Error creating sample file: ${exception.getMessage}")
    }
  }
  
  def addLineInMiddle(fileName: String, content: List[String]): Unit = {
    Try {
      val middleIndex = content.length / 2
      val newContent = content.take(middleIndex) ++ List("New line by Jimmy") ++ content.drop(middleIndex)
      
      val writer = new PrintWriter(new FileWriter(fileName))
      newContent.foreach(writer.println)
      writer.close()
      
      println(s"Successfully added new line at position ${middleIndex + 1}")
    } match {
      case Success(_) => ()
      case Failure(exception) =>
        println(s"Error updating file: ${exception.getMessage}")
    }
  }
} 