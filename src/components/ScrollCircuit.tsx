
import React, { useEffect, useRef } from 'react';

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  connections: {
    node: CircuitNode;
    currentPosition: number;
    active: boolean;
    direction: number;
  }[];
  color: string;
  pulseRadius: number;
  maxPulseRadius: number;
  pulseActive: boolean;
  pulseSpeed: number;
}

export const ScrollCircuit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CircuitNode[]>([]);
  const animationRef = useRef<number>(0);
  const scrollPercentRef = useRef<number>(0);
  const lastScrollPositionRef = useRef<number>(0);
  const isScrollingDownRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recreate nodes when canvas resizes
      createCircuitNodes();
    };

    // Create circuit nodes
    const createCircuitNodes = () => {
      // Clear existing nodes
      nodesRef.current = [];
      
      // Create vertical paths on both sides
      const leftX = window.innerWidth * 0.1;
      const rightX = window.innerWidth * 0.9;
      const totalHeight = document.body.scrollHeight;
      const nodeDistance = 200; // Distance between nodes
      
      // Left vertical path
      const leftPathNodes: CircuitNode[] = [];
      for (let y = 100; y < totalHeight - 100; y += nodeDistance) {
        leftPathNodes.push(createNode(leftX, y));
      }

      // Right vertical path
      const rightPathNodes: CircuitNode[] = [];
      for (let y = 100; y < totalHeight - 100; y += nodeDistance) {
        rightPathNodes.push(createNode(rightX, y));
      }
      
      // Connect horizontal paths at intervals
      const horizontalConnections = Math.min(leftPathNodes.length, rightPathNodes.length);
      for (let i = 0; i < horizontalConnections; i += 2) {
        if (leftPathNodes[i] && rightPathNodes[i]) {
          connectNodes(leftPathNodes[i], rightPathNodes[i]);
        }
      }

      // Connect vertical nodes in each path
      for (let i = 0; i < leftPathNodes.length - 1; i++) {
        connectNodes(leftPathNodes[i], leftPathNodes[i + 1]);
      }
      
      for (let i = 0; i < rightPathNodes.length - 1; i++) {
        connectNodes(rightPathNodes[i], rightPathNodes[i + 1]);
      }
      
      // Add some diagonal connections for visual interest
      for (let i = 0; i < Math.min(leftPathNodes.length, rightPathNodes.length) - 1; i += 3) {
        if (leftPathNodes[i] && rightPathNodes[i + 1]) {
          connectNodes(leftPathNodes[i], rightPathNodes[i + 1]);
        }
        if (rightPathNodes[i] && leftPathNodes[i + 1]) {
          connectNodes(rightPathNodes[i], leftPathNodes[i + 1]);
        }
      }
      
      // Add some central component nodes
      for (let i = 1; i < Math.min(leftPathNodes.length, rightPathNodes.length) - 1; i += 2) {
        if (leftPathNodes[i] && rightPathNodes[i]) {
          const midX = (leftPathNodes[i].x + rightPathNodes[i].x) / 2;
          const midY = (leftPathNodes[i].y + rightPathNodes[i].y) / 2;
          
          const componentNode = createNode(midX, midY);
          componentNode.radius = 6; // Larger component
          componentNode.color = '#5c5c5c'; // Different color for components (darker gray)
          
          connectNodes(leftPathNodes[i], componentNode);
          connectNodes(componentNode, rightPathNodes[i]);
        }
      }

      // Store all nodes
      nodesRef.current = [...leftPathNodes, ...rightPathNodes];
    };

    // Create a single node
    const createNode = (x: number, y: number): CircuitNode => {
      return {
        x,
        y,
        radius: 3 + Math.random() * 2,
        connections: [],
        color: '#444444', // Changed to dark gray
        pulseRadius: 0,
        maxPulseRadius: 15 + Math.random() * 10,
        pulseActive: false,
        pulseSpeed: 0.5 + Math.random() * 0.5
      };
    };

    // Connect two nodes with a bidirectional connection
    const connectNodes = (nodeA: CircuitNode, nodeB: CircuitNode) => {
      nodeA.connections.push({
        node: nodeB,
        currentPosition: 0,
        active: false,
        direction: 1
      });
      
      nodeB.connections.push({
        node: nodeA,
        currentPosition: 0,
        active: false,
        direction: 1
      });
    };

    // Handle scroll events
    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;
      
      scrollPercentRef.current = scrollTop / scrollHeight;

      // Check if scrolling down
      const isScrollingDown = scrollTop > lastScrollPositionRef.current;
      lastScrollPositionRef.current = scrollTop;
      isScrollingDownRef.current = isScrollingDown;

      // Only activate connections when scrolling down
      if (isScrollingDown) {
        activateConnectionsByScroll(scrollPercentRef.current);
        
        // Reset the timeout to stop animation after a brief period
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingDownRef.current = false;
        }, 200); // Animation will continue for 200ms after scrolling stops
      }
    };

    // Activate specific connections based on scroll percentage
    const activateConnectionsByScroll = (scrollPercent: number) => {
      const allConnections = nodesRef.current.flatMap(node => 
        node.connections.map(conn => ({
          sourceNode: node,
          connection: conn
        }))
      );

      const uniqueConnections = allConnections.filter((conn, index, self) => 
        index === self.findIndex(c => 
          (c.sourceNode === conn.sourceNode && c.connection.node === conn.connection.node) || 
          (c.sourceNode === conn.connection.node && c.connection.node === conn.sourceNode)
        )
      );

      // Activate connections proportionally to scroll position
      const connectionsToActivate = Math.floor(uniqueConnections.length * scrollPercent) + 5;
      
      uniqueConnections.forEach((item, index) => {
        if (index < connectionsToActivate) {
          item.connection.active = true && isScrollingDownRef.current;
          
          // Activate in alternating directions for visual interest
          if (index % 2 === 0) {
            item.connection.direction = 1;
          } else {
            item.connection.direction = -1;
          }
        } else {
          item.connection.active = false;
        }
      });
    };

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw all nodes and connections
      nodesRef.current.forEach(node => {
        // Draw connections
        node.connections.forEach(connection => {
          // Draw the connection line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connection.node.x, connection.node.y);
          ctx.strokeStyle = 'rgba(90, 90, 90, 0.15)'; // Changed to gray
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Draw current flowing through active connections
          if (connection.active && isScrollingDownRef.current) {
            const dx = connection.node.x - node.x;
            const dy = connection.node.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Update current position
            connection.currentPosition += 2 * connection.direction;
            if (connection.currentPosition > distance) connection.currentPosition = 0;
            if (connection.currentPosition < 0) connection.currentPosition = distance;
            
            // Calculate current position
            const percent = connection.currentPosition / distance;
            const currentX = node.x + dx * percent;
            const currentY = node.y + dy * percent;
            
            // Draw current pulse
            ctx.beginPath();
            ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#AAAAAA'; // Changed to light gray
            ctx.fill();
            
            // Draw glow effect
            const gradient = ctx.createRadialGradient(
              currentX, currentY, 0,
              currentX, currentY, 10
            );
            gradient.addColorStop(0, 'rgba(150, 150, 150, 0.7)'); // Changed to gray
            gradient.addColorStop(1, 'rgba(100, 100, 100, 0)');
            
            ctx.beginPath();
            ctx.arc(currentX, currentY, 10, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        });
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Add glow effect to nodes
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 2
        );
        nodeGradient.addColorStop(0, 'rgba(120, 120, 120, 0.4)'); // Changed to gray
        nodeGradient.addColorStop(1, 'rgba(80, 80, 80, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = nodeGradient;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
