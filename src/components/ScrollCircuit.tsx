import React, { useEffect, useRef } from "react";

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  type: "resistor" | "capacitor" | "inductor" | "battery" | "transistor" | "opamp";
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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createCircuitNodes();
    };

    const componentCycle: CircuitNode["type"][] = [
      "resistor",
      "capacitor",
      "inductor",
      "opamp", // Added more op-amps in the cycle
      "resistor",
      "battery",
      "opamp", // Added more op-amps in the cycle
      "resistor",
      "transistor",
      "opamp", // Added more op-amps in the cycle
    ];

    const createCircuitNodes = () => {
      nodesRef.current = [];
      const totalHeight = document.body.scrollHeight;
      const nodeDistance = 120;
      
      // Calculate column widths to fill the screen
      const columnWidth = window.innerWidth * 0.15; // Reduced to 15% to fit more columns
      const extraColumnWidth = window.innerWidth * 0.08; // Reduced to 8% for extra columns

      // Create structured circuit paths with more nodes
      const createCircuitPath = (startX: number, startY: number, width: number, height: number, numNodes: number) => {
        const nodes: CircuitNode[] = [];
        const stepX = width / (numNodes - 1);
        const stepY = height / (numNodes - 1);
        
        // Create nodes in a rectangular pattern with randomized component types
        for (let i = 0; i < numNodes; i++) {
          const x = startX + (i * stepX);
          const y = startY + (i * stepY);
          // Randomly select component type
          const type = componentCycle[Math.floor(Math.random() * componentCycle.length)];
          nodes.push(createNode(x, y, type));
        }
        return nodes;
      };

      // Create more circuit paths with more nodes
      const leftCircuit = createCircuitPath(
        window.innerWidth * 0.03, // Start at 3% of screen width
        100,
        columnWidth,
        totalHeight - 200,
        12
      );
      
      const centerLeftCircuit = createCircuitPath(
        window.innerWidth * 0.2, // Start at 20% of screen width
        100,
        columnWidth,
        totalHeight - 200,
        12
      );
      
      const centerRightCircuit = createCircuitPath(
        window.innerWidth * 0.37, // Start at 37% of screen width
        100,
        columnWidth,
        totalHeight - 200,
        12
      );

      const rightCircuit = createCircuitPath(
        window.innerWidth * 0.54, // Start at 54% of screen width
        100,
        columnWidth,
        totalHeight - 200,
        12
      );

      const farRightCircuit = createCircuitPath(
        window.innerWidth * 0.71, // Start at 71% of screen width
        100,
        columnWidth,
        totalHeight - 200,
        12
      );

      const extraFarRightCircuit = createCircuitPath(
        window.innerWidth * 0.88, // Start at 88% of screen width
        100,
        columnWidth,
        totalHeight - 200,
        12
      );

      // Add additional circuit paths
      const extraLeftCircuit = createCircuitPath(
        window.innerWidth * 0.115, // Between left and center-left
        200,
        extraColumnWidth,
        totalHeight - 300,
        10
      );

      const extraCenterLeftCircuit = createCircuitPath(
        window.innerWidth * 0.285, // Between center-left and center-right
        200,
        extraColumnWidth,
        totalHeight - 300,
        10
      );

      const extraCenterRightCircuit = createCircuitPath(
        window.innerWidth * 0.455, // Between center-right and right
        200,
        extraColumnWidth,
        totalHeight - 300,
        10
      );

      const extraRightCircuit = createCircuitPath(
        window.innerWidth * 0.625, // Between right and far-right
        200,
        extraColumnWidth,
        totalHeight - 300,
        10
      );

      const extraFarRightCircuit2 = createCircuitPath(
        window.innerWidth * 0.795, // Between far-right and extra-far-right
        200,
        extraColumnWidth,
        totalHeight - 300,
        10
      );

      // Connect nodes in a more circuit-like pattern
      const connectCircuitPath = (path: CircuitNode[]) => {
        for (let i = 0; i < path.length - 1; i++) {
          connectNodes(path[i], path[i + 1]);
        }
      };

      // Connect horizontal paths between circuits
      const connectCircuitsHorizontally = (path1: CircuitNode[], path2: CircuitNode[]) => {
        for (let i = 0; i < path1.length; i += 2) {
          if (path1[i] && path2[i]) {
            connectNodes(path1[i], path2[i]);
          }
        }
      };

      // Connect the circuits
      connectCircuitPath(leftCircuit);
      connectCircuitPath(centerLeftCircuit);
      connectCircuitPath(centerRightCircuit);
      connectCircuitPath(rightCircuit);
      connectCircuitPath(farRightCircuit);
      connectCircuitPath(extraFarRightCircuit);
      connectCircuitPath(extraLeftCircuit);
      connectCircuitPath(extraCenterLeftCircuit);
      connectCircuitPath(extraCenterRightCircuit);
      connectCircuitPath(extraRightCircuit);
      connectCircuitPath(extraFarRightCircuit2);

      // Connect main circuits horizontally
      connectCircuitsHorizontally(leftCircuit, centerLeftCircuit);
      connectCircuitsHorizontally(centerLeftCircuit, centerRightCircuit);
      connectCircuitsHorizontally(centerRightCircuit, rightCircuit);
      connectCircuitsHorizontally(rightCircuit, farRightCircuit);
      connectCircuitsHorizontally(farRightCircuit, extraFarRightCircuit);
      connectCircuitsHorizontally(extraLeftCircuit, extraCenterLeftCircuit);
      connectCircuitsHorizontally(extraCenterLeftCircuit, extraCenterRightCircuit);
      connectCircuitsHorizontally(extraCenterRightCircuit, extraRightCircuit);
      connectCircuitsHorizontally(extraRightCircuit, extraFarRightCircuit2);

      // Add more complex connections
      for (let i = 1; i < leftCircuit.length - 1; i += 2) {
        if (leftCircuit[i] && extraLeftCircuit[i - 1]) {
          connectNodes(leftCircuit[i], extraLeftCircuit[i - 1]);
        }
        if (centerLeftCircuit[i] && extraCenterLeftCircuit[i - 1]) {
          connectNodes(centerLeftCircuit[i], extraCenterLeftCircuit[i - 1]);
        }
        if (centerRightCircuit[i] && extraCenterRightCircuit[i - 1]) {
          connectNodes(centerRightCircuit[i], extraCenterRightCircuit[i - 1]);
        }
        if (rightCircuit[i] && extraRightCircuit[i - 1]) {
          connectNodes(rightCircuit[i], extraRightCircuit[i - 1]);
        }
        if (farRightCircuit[i] && extraFarRightCircuit2[i - 1]) {
          connectNodes(farRightCircuit[i], extraFarRightCircuit2[i - 1]);
        }
      }

      // Add some feedback loops
      for (let i = 2; i < leftCircuit.length - 2; i += 2) {
        if (leftCircuit[i] && centerLeftCircuit[i + 1]) {
          connectNodes(leftCircuit[i], centerLeftCircuit[i + 1]);
        }
        if (centerLeftCircuit[i] && centerRightCircuit[i + 1]) {
          connectNodes(centerLeftCircuit[i], centerRightCircuit[i + 1]);
        }
        if (centerRightCircuit[i] && rightCircuit[i + 1]) {
          connectNodes(centerRightCircuit[i], rightCircuit[i + 1]);
        }
        if (rightCircuit[i] && farRightCircuit[i + 1]) {
          connectNodes(rightCircuit[i], farRightCircuit[i + 1]);
        }
        if (farRightCircuit[i] && extraFarRightCircuit2[i + 1]) {
          connectNodes(farRightCircuit[i], extraFarRightCircuit2[i + 1]);
        }
      }

      nodesRef.current = [
        ...leftCircuit,
        ...centerLeftCircuit,
        ...centerRightCircuit,
        ...rightCircuit,
        ...farRightCircuit,
        ...extraFarRightCircuit,
        ...extraLeftCircuit,
        ...extraCenterLeftCircuit,
        ...extraCenterRightCircuit,
        ...extraRightCircuit,
        ...extraFarRightCircuit2
      ];

      // Initialize connections with random activation
      nodesRef.current.forEach(node => {
        node.connections.forEach(conn => {
          // Randomly activate connections
          conn.active = Math.random() < 0.7; // 70% chance of being active
          // Random initial position
          conn.currentPosition = Math.random();
          // Random direction
          conn.direction = Math.random() < 0.5 ? 1 : -1;
        });
      });
    };

    const createNode = (x: number, y: number, type: CircuitNode["type"]): CircuitNode => ({
      x,
      y,
      radius: 8, // Increased from 4 to 8
      type,
      connections: [],
      color: "#a855f7",
      pulseRadius: 0,
      maxPulseRadius: 24, // Increased from 18 to 24
      pulseActive: false,
      pulseSpeed: 0.4, // Slowed down from 0.6
    });

    const connectNodes = (a: CircuitNode, b: CircuitNode) => {
      if (!a || !b) return; // Safeguard
      const link = {
        node: b,
        currentPosition: 0,
        active: false,
        direction: 1,
      } as const;
      a.connections.push({ ...link });
      b.connections.push({ ...link, node: a });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      scrollPercentRef.current = scrollTop / scrollHeight;
      const down = scrollTop > lastScrollPositionRef.current;
      lastScrollPositionRef.current = scrollTop;
      isScrollingDownRef.current = down;
      
      // Update connection directions based on scroll
      nodesRef.current.forEach(node => {
        node.connections.forEach(conn => {
          if (conn.active) {
            conn.direction = down ? 1 : -1;
          }
        });
      });
      
      // Trigger node pulses during scrolling
      triggerNodePulses();
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingDownRef.current = false;
        // Randomize directions when scrolling stops
        nodesRef.current.forEach(node => {
          node.connections.forEach(conn => {
            if (conn.active) {
              conn.direction = Math.random() < 0.5 ? 1 : -1;
            }
          });
        });
      }, 200);
    };

    const activateConnectionsByScrollPosition = (percent: number) => {
      // Keep all connections active
      nodesRef.current.forEach(node => {
        node.connections.forEach(conn => {
          conn.active = true;
        });
      });
    };
    
    const triggerNodePulses = () => {
      // Find nodes that are currently visible in the viewport
      const viewportTop = window.scrollY;
      const viewportBottom = viewportTop + window.innerHeight;
      
      nodesRef.current.forEach(node => {
        if (node.y >= viewportTop && node.y <= viewportBottom) {
          // Add some randomness to pulse activation
          if (Math.random() < 0.3) { // 30% chance to pulse
            node.pulseActive = true;
            node.pulseRadius = 0;
          }
        }
      });
    };

    // ───────────────── drawing helpers
    const drawSymbol = (ctx: CanvasRenderingContext2D, n: CircuitNode) => {
      ctx.save();
      ctx.translate(n.x, n.y);
      
      // Draw glow effect
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, n.radius * 2);
      glowGradient.addColorStop(0, `rgba(168, 85, 247, ${0.3 + Math.sin(Date.now() * 0.001) * 0.1})`);
      glowGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, n.radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw symbol based on type
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#a855f7';

      switch (n.type) {
        case 'resistor':
          // Draw zigzag resistor symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, 0);
          for (let i = 0; i < 3; i++) {
            ctx.lineTo(-n.radius + (i + 0.5) * n.radius, -n.radius);
            ctx.lineTo(-n.radius + (i + 1) * n.radius, 0);
          }
          ctx.stroke();
          break;

        case 'capacitor':
          // Draw capacitor symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, -n.radius);
          ctx.lineTo(-n.radius, n.radius);
          ctx.moveTo(n.radius, -n.radius);
          ctx.lineTo(n.radius, n.radius);
          ctx.stroke();
          break;

        case 'inductor':
          // Draw inductor symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, 0);
          for (let i = 0; i < 3; i++) {
            ctx.arc(-n.radius + (i + 0.5) * n.radius, 0, n.radius / 2, 0, Math.PI * 2);
          }
          ctx.stroke();
          break;

        case 'battery':
          // Draw battery symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, -n.radius);
          ctx.lineTo(-n.radius, n.radius);
          ctx.moveTo(n.radius, -n.radius);
          ctx.lineTo(n.radius, n.radius);
          ctx.moveTo(-n.radius / 2, -n.radius / 2);
          ctx.lineTo(n.radius / 2, -n.radius / 2);
          ctx.stroke();
          break;

        case 'transistor':
          // Draw transistor symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, -n.radius);
          ctx.lineTo(n.radius, 0);
          ctx.lineTo(-n.radius, n.radius);
          ctx.closePath();
          ctx.stroke();
          break;

        case 'opamp':
          // Draw op-amp symbol
          ctx.beginPath();
          ctx.moveTo(-n.radius, -n.radius);
          ctx.lineTo(n.radius, 0);
          ctx.lineTo(-n.radius, n.radius);
          ctx.closePath();
          ctx.stroke();
          // Draw + and - inputs
          ctx.beginPath();
          ctx.arc(-n.radius / 2, -n.radius / 2, n.radius / 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-n.radius / 2, n.radius / 2);
          ctx.lineTo(-n.radius / 2 + n.radius / 2, n.radius / 2);
          ctx.stroke();
          break;
      }

      // Draw pulse if active
      if (n.pulseActive) {
        const pulseGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, n.pulseRadius);
        const opacity = 1 - (n.pulseRadius / n.maxPulseRadius);
        pulseGradient.addColorStop(0, `rgba(168, 85, 247, ${opacity * 0.8})`);
        pulseGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        
        ctx.beginPath();
        ctx.arc(0, 0, n.pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = pulseGradient;
        ctx.fill();

        n.pulseRadius += n.pulseSpeed;
        if (n.pulseRadius > n.maxPulseRadius) {
          n.pulseRadius = 0;
          n.pulseActive = false;
        }
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections with improved visibility
      nodesRef.current.forEach(node => {
        node.connections.forEach(conn => {
          // Always draw the connection line, but make it subtle
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(conn.node.x, conn.node.y);
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
          ctx.lineWidth = 2; // Increased from 1 to 2
          ctx.stroke();

          if (conn.active) {
            // Draw the active connection with a gradient
            const gradient = ctx.createLinearGradient(node.x, node.y, conn.node.x, conn.node.y);
            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
            gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.3)');
            gradient.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(conn.node.x, conn.node.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3; // Increased from 1.5 to 3
            ctx.stroke();

            // Draw moving dot with enhanced visibility
            const progress = conn.currentPosition;
            const x = node.x + (conn.node.x - node.x) * progress;
            const y = node.y + (conn.node.y - node.y) * progress;
            
            // Draw a larger, more visible electron dot
            const dotGradient = ctx.createRadialGradient(x, y, 0, x, y, 7); // Increased from 5 to 7
            dotGradient.addColorStop(0, 'rgba(168, 85, 247, 1)');
            dotGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.8)');
            dotGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
            
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2); // Increased from 5 to 7
            ctx.fillStyle = dotGradient;
            ctx.fill();

            // Update position with slower speed
            conn.currentPosition += 0.015 * conn.direction; // Decreased from 0.02 to 0.015
            if (conn.currentPosition >= 1) {
              conn.currentPosition = 0;
            } else if (conn.currentPosition <= 0) {
              conn.currentPosition = 1;
            }
          }
        });
      });

      // Draw nodes
      nodesRef.current.forEach(node => {
        drawSymbol(ctx, node);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize animation
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
