package hu.the.dzae6i;

import java.io.File;
import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class DomReadDZAE6I {
    
    public DomReadDZAE6I() throws SAXException, IOException, ParserConfigurationException {
        try {
            //File xml_file = new File("DZAE6I_orarend.xml");
            //File xml_file = new File("C:\\VZGit\\DZAE6IWebkonyv\\DZAE6I_0430\\DomParseDZAE6I\\src\\main\\java\\hu\\the\\dzae6i\\DZAE6I_orarend.xml");
            File xml_file = new File("DZAE6I_0430/DomParseDZAE6I/src/main/java/hu/the/dzae6i/orarendDZAE6I.xml"); //Linux
            DocumentBuilderFactory document_builder_factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder document_builder = document_builder_factory.newDocumentBuilder();
            org.w3c.dom.Document xml_document = document_builder.parse(xml_file);
            xml_document.getDocumentElement().normalize();

            System.out.println("Root node: " + xml_document.getDocumentElement().getNodeName());
            
            NodeList node_list = xml_document.getElementsByTagName("event");
            System.out.println("Found nodes: " + node_list.getLength());

            for (int i = 0; i < node_list.getLength(); i++) {
                Node node = node_list.item(i);
                
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    
                    System.out.println("ID: " + element.getAttribute("id"));
                    System.out.println("Course type: " + element.getAttribute("type"));
                    System.out.println("Course name: " + element.getElementsByTagName("course_name").item(0).getTextContent());
                    System.out.println("Presenter: " + element.getElementsByTagName("presenter").item(0).getTextContent());
                    System.out.println("Major: " + element.getElementsByTagName("major").item(0).getTextContent());
                    System.out.println("Address: " + element.getElementsByTagName("address").item(0).getTextContent());
                    
                    //System.out.println("DateTime: " + element.getElementsByTagName("datetime").item(0).getTextContent());
                    NodeList datetime_list = element.getElementsByTagName("datetime");
                    for (int j = 0; j < datetime_list.getLength(); j++) {
                        Node datetime_node = datetime_list.item(j);

                        if (datetime_node.getNodeType() == Node.ELEMENT_NODE) {
                            Element datetime_element = (Element) datetime_node;
                            System.out.println(datetime_element.getElementsByTagName("date").item(0).getTextContent());
                            System.out.println(datetime_element.getElementsByTagName("time_start").item(0).getTextContent());
                            System.out.println(datetime_element.getElementsByTagName("time_end").item(0).getTextContent());
                        }
                    }
                    
                    System.out.println("");
                }
            }
        }
        catch (IOException | ParserConfigurationException | SAXException exception) {
            exception.printStackTrace();
        }
    }
    
    public static void main(String[] args) throws SAXException, IOException, ParserConfigurationException {
        DomReadDZAE6I dom_read = new DomReadDZAE6I();
    }
    
}
