import java.io.File
import java.lang.management.ManagementFactory
import com.sun.management.OperatingSystemMXBean
import scala.util.{Try, Success, Failure}

object SystemInfo {
  def main(args: Array[String]): Unit = {
    println("=== SYSTEM HARDWARE INFORMATION ===\n")
    
    // Get RAM information
    printRamInfo()
    
    // Get hard disk information
    printDiskInfo()
    
    // Get video card information
    printVideoCardInfo()
    
    // Get general system information
    printGeneralSystemInfo()
  }
  
  def printRamInfo(): Unit = {
    println("=== RAM (MEMORY) INFORMATION ===")
    try {
      val osBean = ManagementFactory.getOperatingSystemMXBean.asInstanceOf[OperatingSystemMXBean]
      
      val totalPhysicalMemory = osBean.getTotalPhysicalMemorySize
      val freePhysicalMemory = osBean.getFreePhysicalMemorySize
      val usedPhysicalMemory = totalPhysicalMemory - freePhysicalMemory
      
      println(s"Total Physical Memory: ${formatBytes(totalPhysicalMemory)}")
      println(s"Used Memory: ${formatBytes(usedPhysicalMemory)}")
      println(s"Free Memory: ${formatBytes(freePhysicalMemory)}")
      println(s"Memory Usage: ${(usedPhysicalMemory.toDouble / totalPhysicalMemory * 100).formatted("%.2f")}%")
      println()
    } catch {
      case e: Exception =>
        println(s"Error getting RAM information: ${e.getMessage}")
        println()
    }
  }
  
  def printDiskInfo(): Unit = {
    println("=== HARD DISK INFORMATION ===")
    try {
      val roots = File.listRoots()
      roots.foreach { root =>
        println(s"Drive: ${root.getPath}")
        println(s"  Total Space: ${formatBytes(root.getTotalSpace)}")
        println(s"  Free Space: ${formatBytes(root.getFreeSpace)}")
        println(s"  Used Space: ${formatBytes(root.getTotalSpace - root.getFreeSpace)}")
        println(s"  Usage: ${((root.getTotalSpace - root.getFreeSpace).toDouble / root.getTotalSpace * 100).formatted("%.2f")}%")
        println()
      }
    } catch {
      case e: Exception =>
        println(s"Error getting disk information: ${e.getMessage}")
        println()
    }
  }
  
  def printVideoCardInfo(): Unit = {
    println("=== VIDEO CARD INFORMATION ===")
    try {
      // Get graphics information using system properties
      val graphicsEnv = System.getProperty("java.awt.graphicsenv")
      println(s"Graphics Environment: $graphicsEnv")
      
      // Try to get more detailed graphics info
      val osName = System.getProperty("os.name").toLowerCase
      if (osName.contains("windows")) {
        getWindowsVideoInfo()
      } else if (osName.contains("linux")) {
        getLinuxVideoInfo()
      } else if (osName.contains("mac")) {
        getMacVideoInfo()
      } else {
        println("Operating system not specifically supported for detailed video card info")
      }
      println()
    } catch {
      case e: Exception =>
        println(s"Error getting video card information: ${e.getMessage}")
        println()
    }
  }
  
  def getWindowsVideoInfo(): Unit = {
    try {
      // Use WMI to get video card info on Windows
      val process = Runtime.getRuntime.exec("wmic path win32_VideoController get name,adapterram")
      val reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream))
      var line: String = null
      var isFirstLine = true
      
      while ({line = reader.readLine(); line != null}) {
        if (!isFirstLine && line.trim.nonEmpty) {
          val parts = line.split("\\s+")
          if (parts.length >= 2) {
            val name = parts(0)
            val ram = Try(parts(1).toLong).getOrElse(0L)
            println(s"Video Card: $name")
            if (ram > 0) {
              println(s"  Video Memory: ${formatBytes(ram)}")
            }
          }
        }
        isFirstLine = false
      }
      reader.close()
    } catch {
      case e: Exception =>
        println(s"Could not get detailed Windows video info: ${e.getMessage}")
    }
  }
  
  def getLinuxVideoInfo(): Unit = {
    try {
      // Try to read from /proc/driver/nvidia/version or lspci
      val process = Runtime.getRuntime.exec("lspci | grep -i vga")
      val reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream))
      var line: String = null
      
      while ({line = reader.readLine(); line != null}) {
        println(s"Video Card: ${line.trim}")
      }
      reader.close()
    } catch {
      case e: Exception =>
        println(s"Could not get detailed Linux video info: ${e.getMessage}")
    }
  }
  
  def getMacVideoInfo(): Unit = {
    try {
      // Use system_profiler on macOS
      val process = Runtime.getRuntime.exec("system_profiler SPDisplaysDataType")
      val reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream))
      var line: String = null
      
      while ({line = reader.readLine(); line != null}) {
        if (line.contains("Chipset Model:") || line.contains("Vendor:")) {
          println(s"Video Card: ${line.trim}")
        }
      }
      reader.close()
    } catch {
      case e: Exception =>
        println(s"Could not get detailed Mac video info: ${e.getMessage}")
    }
  }
  
  def printGeneralSystemInfo(): Unit = {
    println("=== GENERAL SYSTEM INFORMATION ===")
    println(s"Operating System: ${System.getProperty("os.name")} ${System.getProperty("os.version")}")
    println(s"Architecture: ${System.getProperty("os.arch")}")
    println(s"Java Version: ${System.getProperty("java.version")}")
    println(s"Java Vendor: ${System.getProperty("java.vendor")}")
    println(s"Number of Processors: ${Runtime.getRuntime.availableProcessors()}")
    println(s"User Name: ${System.getProperty("user.name")}")
    println(s"User Home: ${System.getProperty("user.home")}")
    println()
  }
  
  def formatBytes(bytes: Long): String = {
    val units = Array("B", "KB", "MB", "GB", "TB")
    var size = bytes.toDouble
    var unitIndex = 0
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex += 1
    }
    
    f"$size%.2f ${units(unitIndex)}"
  }
} 