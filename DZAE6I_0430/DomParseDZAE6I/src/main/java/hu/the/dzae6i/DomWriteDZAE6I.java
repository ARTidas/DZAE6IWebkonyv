package hu.the.dzae6i;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class DomWriteDZAE6I {
    
    public DomWriteDZAE6I() {
        try {
            //File xml_file = new File("C:\\VZGit\\DZAE6IWebkonyv\\DZAE6I_0430\\DomParseDZAE6I\\src\\main\\java\\hu\\the\\dzae6i\\DZAE6I_orarend.xml");
            File xml_file = new File("DZAE6I_0430/DomParseDZAE6I/src/main/java/hu/the/dzae6i/orarendDZAE6I.xml");
            DocumentBuilderFactory document_builder_factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder document_builder = document_builder_factory.newDocumentBuilder();
            org.w3c.dom.Document xml_document = document_builder.parse(xml_file);
            xml_document.getDocumentElement().normalize();
            
            // New XML document
            Document new_document = document_builder.newDocument();
            
            System.out.println("Root node: " + xml_document.getDocumentElement().getNodeName());
            //https://mkyong.com/java/how-to-create-xml-file-in-java-dom/
            Element new_root_element = new_document.createElement(
                xml_document.getDocumentElement().getNodeName()
            );
            new_document.appendChild(new_root_element);
            
            NodeList node_list = xml_document.getElementsByTagName("event");
            System.out.println("Found nodes: " + node_list.getLength());
            
            for (int i = 0; i < node_list.getLength(); i++) {
                Node node = node_list.item(i);
                
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    
                    //https://attacomsian.com/blog/java-read-write-xml
                    Attr id_attribute = new_document.createAttribute("id");
                    Attr type_attribute = new_document.createAttribute("id");
                    id_attribute.setValue(element.getAttribute("id"));
                    type_attribute.setValue(element.getAttribute("type"));
                    Element new_element = new_document.createElement("event");
                    new_element.setAttributeNode(id_attribute);
                    new_element.setAttributeNode(type_attribute);
                    new_root_element.appendChild(new_element);
                    
                    System.out.println("ID: " + element.getAttribute("id"));
                    System.out.println("Course type: " + element.getAttribute("type"));
                    System.out.println("Course name: " + element.getElementsByTagName("course_name").item(0).getTextContent());
                    System.out.println("Presenter: " + element.getElementsByTagName("presenter").item(0).getTextContent());
                    System.out.println("Major: " + element.getElementsByTagName("major").item(0).getTextContent());
                    System.out.println("Address: " + element.getElementsByTagName("address").item(0).getTextContent());
                    
                    //System.out.println("DateTime: " + element.getElementsByTagName("datetime").item(0).getTextContent());
                    //https://stackoverflow.com/questions/8328002/java-reading-xml-with-many-nested-elements
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
            
            //https://mkyong.com/java/how-to-create-xml-file-in-java-dom/
            FileOutputStream xml_output = new FileOutputStream(
                //"C:\\VZGit\\DZAE6IWebkonyv\\DZAE6I_0430\\DomParseDZAE6I\\src\\main\\java\\hu\\the\\dzae6i\\orarend1DZAE6I.xml" //Windows
                "DZAE6I_0430/DomParseDZAE6I/src/main/java/hu/the/dzae6i/orarend1DZAE6I.xml" //Linux
            );
            writeXml(
                new_document, 
                xml_output
            );
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
    }
    
    //https://mkyong.com/java/how-to-create-xml-file-in-java-dom/
    // write doc to output stream
    private static void writeXml(Document doc, OutputStream output) throws TransformerException {

        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        DOMSource source = new DOMSource(doc);
        StreamResult result = new StreamResult(output);

        transformer.transform(source, result);

    }
    
}
