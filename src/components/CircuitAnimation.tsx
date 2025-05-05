
import React, { useEffect, useRef } from 'react';

export const CircuitAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circuit node class
    class Node {
      x: number;
      y: number;
      radius: number;
      connections: Node[];
      pulseRadius: number;
      maxPulseRadius: number;
      pulseSpeed: number;
      pulseActive: boolean;
      color: string;

      constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.connections = [];
        this.pulseRadius = 0;
        this.maxPulseRadius = radius * 3;
        this.pulseSpeed = 0.5 + Math.random() * 0.5;
        this.pulseActive = false;
        this.color = '#00FFFF';
        
        // Randomly activate pulse
        setTimeout(() => {
          this.activatePulse();
        }, Math.random() * 5000);
      }

      connect(node: Node) {
        this.connections.push(node);
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw connections
        this.connections.forEach(node => {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw pulse if active
        if (this.pulseActive) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
          const opacity = 1 - (this.pulseRadius / this.maxPulseRadius);
          ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          this.pulseRadius += this.pulseSpeed;
          if (this.pulseRadius > this.maxPulseRadius) {
            this.pulseRadius = 0;
            this.pulseActive = false;
            
            // Reactivate after delay
            setTimeout(() => {
              this.activatePulse();
            }, 2000 + Math.random() * 5000);
          }
        }
      }

      activatePulse() {
        this.pulseActive = true;
        this.pulseRadius = 0;
        
        // Activate connected nodes with delay
        this.connections.forEach((node, index) => {
          setTimeout(() => {
            node.activatePulse();
          }, 200 * (index + 1));
        });
      }
    }

    // Create nodes
    const numNodes = Math.floor(window.innerWidth / 100); // Adjust density
    const nodes: Node[] = [];
    
    for (let i = 0; i < numNodes; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 2 + Math.random() * 3;
      nodes.push(new Node(x, y, radius));
    }

    // Create connections
    nodes.forEach(node => {
      // Find 1-3 nearest nodes to connect to
      const numConnections = 1 + Math.floor(Math.random() * 3);
      const otherNodes = [...nodes].filter(n => n !== node);
      
      otherNodes.sort((a, b) => {
        const distA = Math.sqrt(Math.pow(a.x - node.x, 2) + Math.pow(a.y - node.y, 2));
        const distB = Math.sqrt(Math.pow(b.x - node.x, 2) + Math.pow(b.y - node.y, 2));
        return distA - distB;
      });
      
      const nodesToConnect = otherNodes.slice(0, numConnections);
      nodesToConnect.forEach(n => {
        node.connect(n);
      });
    });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach(node => {
        node.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
