<script lang="ts">

</script>

<section>
		<div>
			<h3>Evexia Inc.</h3>
			<div class="job-meta">
				<small class="font-bold">Co-Founder & CTO</small>
				<small>2020 - 2024</small>
			</div>
			<div class="description">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
			</div>
			<div class="footer">
				<!-- Footer content can be added here -->
			</div>
		</div>
		<div>
			<h3>Evexia Inc.</h3>
			<div class="job-meta">
				<small class="font-bold">Co-Founder & CTO</small>
				<small>2020 - 2024</small>
			</div>
			<div class="description">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
			</div>
			<div class="footer">
				<!-- Footer content can be added here -->
			</div>
		</div>
		<div>
			<h3>Evexia Inc.</h3>
			<div class="job-meta">
				<small class="font-bold">Co-Founder & CTO</small>
				<small>2020 - 2024</small>
			</div>
			<div class="description">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
			</div>
			<div class="footer">
				<!-- Footer content can be added here -->
			</div>
		</div>
</section>

<style>
    section {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 2rem;
            width: 2px;
            height: 100%;
            background-color: var(--color-muted);
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 2rem;
            width: 2px;
            height: 3rem;
            background: linear-gradient(to bottom, transparent, var(--color-primary), transparent);
            animation: view-y linear both;
            animation-timeline: scroll();
            animation-range: 0 100vh;
        }

        @keyframes view-y {
            to {
                transform: translateY(100%);
            }
        }
    }
</style>
